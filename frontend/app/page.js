"use client";

import { Trash2, Recycle, Pointer } from "lucide-react";
import Button from '@mui/material/Button';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { use, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Dashboard() {
  const  [login,islogin] = useState(true)


  return (
    <div className="bg-gray-200 text-black min-h-screen p-6">
      <div className="flex justify-between items-center mb-6 mr-3">
        <h1 className="text-2xl font-bold">Waste Management Dashboard</h1>
        {login ?
          <div className="flex flex-row gap-8">
          <div className="flex gap-3 rounded shadow items-center px-2 hover:shadow-2xl transition-shadow duration-150 cursor-pointer">
            <MonetizationOnIcon className="text-yellow-500" style={{ fontSize: "30px" }} />
            <div className="flex gap-1">  
            <span className="font-semibold text-lg">Rewards:</span>
            <span className="font-semibold text-lg">23</span>
            </div>
          </div>
          <AccountCircleIcon sx={{fontSize:50,color:"gray",cursor:"pointer"}}/>
        </div> 
        :
        <Button variant="contained">Login</Button>
        }
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waste Collected Section */}
        <div className="p-4 flex items-center gap-4 border rounded shadow">
          <Trash2 size={40} className="text-red-500" />
          <div>
            <h2 className="text-lg font-semibold">Total Waste Collected</h2>
            <p className="text-2xl font-bold">750 kg</p>
          </div>
        </div>

        {/* Waste Recycled Section */}
        <div className="p-4 flex items-center gap-4 border rounded shadow">
          <Recycle size={40} className="text-green-500" />
          <div>
            <h2 className="text-lg font-semibold">Total Waste Recycled</h2>
            <p className="text-2xl font-bold">400 kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
