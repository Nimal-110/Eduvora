"use client";

import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Home, Calendar, MessageSquare, Award, User, Menu as MenuIcon, HomeIcon, CircleHelp } from "lucide-react";
import Card from "@/components/Card";
import SideCompo from "@/components/SideCompo";
export default function Message() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <div className="fixed w-60">
          <SideCompo/>
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
