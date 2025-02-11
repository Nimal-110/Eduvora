from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import json

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Room manager to manage WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.rooms = {}  # Room name -> list of WebSocket connections

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.rooms:
            self.rooms[room] = []
        self.rooms[room].append(websocket)

    def disconnect(self, websocket: WebSocket, room: str):
        if room in self.rooms:
            self.rooms[room].remove(websocket)
            if len(self.rooms[room]) == 0:
                del self.rooms[room]

    async def broadcast(self, message: str, room: str, sender: WebSocket):
        if room in self.rooms:
            for connection in self.rooms[room]:
                if connection != sender:  # Avoid echoing the message back to the sender
                    await connection.send_text(message)

manager = ConnectionManager()

# WebSocket endpoint for signaling
@app.websocket("/ws/{room}")
async def websocket_endpoint(websocket: WebSocket, room: str):
    await manager.connect(websocket, room)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data, room, sender=websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket, room)


# Serve static files (frontend) from the `frontend` folder
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
