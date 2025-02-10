import { Home, Calendar, MessageSquare, Award, User, Menu as MenuIcon, HomeIcon } from "lucide-react";
export default function List({setCollapsed,collapsed}){
    return(
        <Menu className="-mx-5">
          <MenuItem icon={<MenuIcon />} className="hover:bg-gray-200 p-2 rounded-lg transition" onClick={() => setCollapsed(!collapsed)} >Menu</MenuItem>
          <MenuItem icon={<HomeIcon />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/" >Home</MenuItem>
          <MenuItem icon={<Calendar />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/schedule">Schedule</MenuItem>
          <MenuItem icon={<MessageSquare />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/message">Community</MenuItem>
          <MenuItem icon={<Award />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/rewards">Rewards</MenuItem>
          <MenuItem icon={<User />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/profile">Profile</MenuItem>
        </Menu>
    );
}