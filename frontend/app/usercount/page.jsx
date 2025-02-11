"use client";

import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";

export default function Chat() {
    const { roomId, username } = useParams(); // Get roomId & username from URL
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [userCount, setUserCount] = useState(0); // State for connected users

    // WebSocket connection URL
    const socketUrl = `ws://localhost:8080?roomId=${roomId}&username=${username}`;

    // WebSocket hook for communication
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: () => console.log(`Connected to WebSocket as ${username}`),
        onClose: () => console.log("Disconnected from WebSocket"),
        shouldReconnect: () => true, // Auto-reconnect if disconnected
    });

    // Handle incoming messages
    useEffect(() => {
        if (lastMessage !== null) {
            try {
                const data = JSON.parse(lastMessage.data);
                if (data.type === "previousMessages") {
                    setMessages(data.data); // Load chat history
                } else if (data.type === "newMessage") {
                    setMessages((prev) => [...prev, data]); // Append new messages
                } else if (data.type === "userCount") {
                    setUserCount(data.count); // Update active users count
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        }
    }, [lastMessage]);

    // Send Message to WebSocket
    const handleSendMessage = () => {
        if (message.trim() !== "") {
            const messageData = { roomId, username, message };
            sendMessage(JSON.stringify(messageData)); // Send message as JSON
            setMessage(""); // Clear input
        }
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-900 text-white">
            {/* Display number of connected users */}
            <div className="text-center text-lg font-bold mb-4">
                🔵 Active Users: {userCount}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto border border-gray-700 rounded-lg p-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.username === username ? "text-right" : "text-left"}`}>
                        <strong>{msg.username || "Unknown"}: </strong>
                        {msg.message}
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="flex mt-4">
                <input
                    type="text"
                    className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
