const ws = require("ws");
const url = require("url");
const http = require("http");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://231501104:zFO6bsXbCQGDhyfA@nexathon.n4nqp.mongodb.net/?retryWrites=true&w=majority&appName=Nexathon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Message Schema & Model
const MessageSchema = new mongoose.Schema({
    roomId: String,
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

const server = http.createServer();
let connectionFunction = {};

const websock = new ws.WebSocketServer({ server });

websock.on("connection", async (connections, req) => {
    console.log("WebSocket connected...");

    const { roomId, username } = url.parse(req.url, true).query;
    connections.username = username;
    connections.roomId = roomId;

    if (!connectionFunction[roomId]) {
        connectionFunction[roomId] = [];
    }
    connectionFunction[roomId].push(connections);

    console.log(`User ${username} joined Room ${roomId}`);

    // Send previous messages from MongoDB to the user
    const previousMessages = await Message.find({ roomId }).sort({ timestamp: 1 });
    connections.send(JSON.stringify({ type: "previousMessages", data: previousMessages }));

    // Handle Incoming Messages
    connections.on("message", async (message) => {
        const messageData = message.toString();
        console.log(`Message from ${username}: ${messageData}`);

        // Save message to MongoDB
        const newMessage = new Message({ roomId, username, message: messageData });
        await newMessage.save();

        // Broadcast message to the room
        connectionFunction[roomId].forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({ type: "newMessage", username, message: messageData }));
            }
        });
    });

    // Handle Disconnection
    connections.on("close", () => {
        connectionFunction[roomId] = connectionFunction[roomId].filter(client => client !== connections);
        console.log(`User ${username} disconnected from Room ${roomId}`);
    });
});

server.listen(8080, () => {
    console.log("WebSocket server running on port 8080...");
});
