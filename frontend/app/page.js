"use client";

import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Calendar, MessageSquare, Award, User, Menu as MenuIcon, HomeIcon, CircleHelp } from "lucide-react";
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

      {/* Main Content */}
      <div className="flex-1 p-6 ml-[250px]">
        <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">Welcome to Your Dashboard</h1>
        
        <div className="flex  flex-wrap gap-6 ">
          {/* AI Recommendation */}
          <Card title="AI Recommended Tutors" content="Find the best tutor based on your learning style." btnname="Find Tutor"/>
          <Card title="Next Session" content="Physics with Alex - Today at 5:00 PM" btnname="Join Session"/>
          <Card title="Your Rewards" content="You have 1200 points. Redeem them for discounts!" btnname="View Rewards"/>
        </div>
      </div>
    </div>
  );
}
