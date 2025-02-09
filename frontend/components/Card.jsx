import { Button } from "@mui/material";
export default function Card({title,content,btnname}){
    return(
        <div className="flex flex-col gap-5">
            <div className="bg-white text-gray-800 p-6 shadow-lg rounded-xl hover:shadow-2xl transition w-[350px] h-[200px]">
            <h2 className="text-xl font-semibold">{title}</h2>
            {/* 20 words can only fit */}
            <p className="text-gray-600 h-[60px]">{content}</p>
            {/* <button className="mt-4 p-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:opacity-90">
              {btnname}
            </button> */}
            <Button variant="contained" className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg">{btnname}</Button>
          </div>
        </div>
    );
}