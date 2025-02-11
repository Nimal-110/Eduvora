"use client";

import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Home, Calendar, MessageSquare, Award, User, Menu as MenuIcon ,HomeIcon, CircleHelp } from "lucide-react";
import Card from "@/components/Card";
import SideCompo from "@/components/SideCompo";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <div className="fixed">
            <SideCompo/>
      </div>
      
    </div>
  );
}
