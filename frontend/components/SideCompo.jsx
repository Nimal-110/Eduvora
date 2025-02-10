"use client";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Calendar, MessageSquare, Award, User, Menu as MenuIcon, HomeIcon, CircleHelp } from "lucide-react";

export default function SideCompo(){

    return(
        <Sidebar className=" sticky h-screen overflow-y-auto bg-white text-gray-900 p-4 shadow-xl rounded-r-xl">
            <Menu className="-mx-5">
                {/* <MenuItem icon={<MenuIcon />} className="hover:bg-gray-200 p-2 rounded-lg transition" >Menu</MenuItem> */}
                <MenuItem icon={<HomeIcon />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/" >Home</MenuItem>
                <MenuItem icon={<Calendar />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/schedule">Schedule</MenuItem>
                <MenuItem icon={<MessageSquare />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/message">Community</MenuItem>
                <MenuItem icon={<Award />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/rewards">Rewards</MenuItem>
                <MenuItem icon={<User />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/profile">Profile</MenuItem>
                <MenuItem icon={<CircleHelp />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/question">Ask Question</MenuItem>
            </Menu>
        </Sidebar> 
    )
}