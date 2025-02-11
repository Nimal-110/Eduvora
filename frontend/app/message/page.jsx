"use client";

import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Home, Calendar, MessageSquare, Award, User, Menu as MenuIcon, HomeIcon, CircleHelp, Send } from "lucide-react";
import Card from "@/components/Card";
import SideCompo from "@/components/SideCompo";
import { Chat } from "@/components/Chat";

export default function Message() {
      const [messages, setMessages] = useState([]);
      const [message, setMessage] = useState("");
      // Ensure roomId and username are defined
      if (!roomId || !username) {
          return <div className="text-red-500">Error: Missing room ID or username.</div>;
      }
  
      // WebSocket connection URL
      const socketUrl = `ws://localhost:8080?roomId=${roomId}&username=${username}`;
  
      // WebSocket hook for communication
      const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
          onOpen: () => console.log(`Connected to WebSocket as ${username}`),
          onClose: () => console.log("Disconnected from WebSocket"),
          shouldReconnect: () => true, // Auto-reconnect if disconnected
      });
  
      // Load previous messages when received
      useEffect(() => {
          if (lastMessage !== null) {
              try {
                  const data = JSON.parse(lastMessage.data);
                  if (data.type === "previousMessages") {
                      setMessages(data.data); // Load chat history
                  } else if (data.type === "newMessage") {
                      setMessages((prev) => [...prev, data]); // Append new messages
                  }
              } catch (error) {
                  console.error("Error parsing message:", error);
              }
          }
      }, [lastMessage]);
  
      // Send Message to WebSocket (Including username)
      const handleSendMessage = () => {
          if (message.trim() !== "") {
              const messageData = message;
              sendMessage(messageData); // Send message as JSON
              setMessage(""); // Clear input after sending
          }
      };
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <div className="fixed w-60">
          <SideCompo/>
      </div>
      <div className="flex-1 p-6 ml-[250px] ">
        <Chat/>
      </div>
    </div>
  );
}

// this is the template
// "use client";

// import { useState } from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Home, Calendar, MessageSquare, Award, User, Menu as MenuIcon, HomeIcon } from "lucide-react";
// import Card from "@/components/Card";

// export default function Message() {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//       {/* Sidebar */}
//       <Sidebar collapsed={collapsed} className="h-full bg-white text-gray-900 p-4 shadow-xl rounded-r-xl">
//         <Menu className="-mx-5">
//           <MenuItem icon={<MenuIcon />} className="hover:bg-gray-200 p-2 rounded-lg transition" onClick={() => setCollapsed(!collapsed)}>Menu</MenuItem>
//           <MenuItem icon={<HomeIcon />} className="hover:bg-gray-200 p-2 rounded-lg transition" onClick={() => setCollapsed(!collapsed)} href="/">Home</MenuItem>
//           <MenuItem icon={<Calendar />} className="hover:bg-gray-200 p-2 rounded-lg transition">Schedule</MenuItem>
//           <MenuItem icon={<MessageSquare />} className="hover:bg-gray-200 p-2 rounded-lg transition">Messages</MenuItem>
//           <MenuItem icon={<Award />} className="hover:bg-gray-200 p-2 rounded-lg transition">Rewards</MenuItem>
//           <MenuItem icon={<User />} className="hover:bg-gray-200 p-2 rounded-lg transition">Profile</MenuItem>
//         </Menu>
      
//       </Sidebar>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
        
//       </div>
//     </div>
//   );
// }
