import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function Card({title,content,btnname}){
      
    const CustomButton = styled(Button)({
      position: "relative",
      overflow: "hidden",
      "& .MuiTouchRipple-root span": {
        backgroundColor: "rgba(147, 51, 234, 0.4) !important", // Purple ripple effect (rgba of purple-600)
      },
    });
    return(
          <div className="bg-white text-gray-800 p-6 shadow-lg rounded-xl hover:shadow-2xl transition w-[350px] h-[200px] grid gap-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {/* 20 words can only fit */}
            <p className="text-gray-600 h-[60px]">{content}</p>
            {/* <button className="mt-4 p-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:opacity-90">
              {btnname}
            </button> */}
            <CustomButton variant="contained" className="inline-block relative bg-gradient-to-br from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg w-40 justify-center" sx={{
              position: "relative",
              overflow: "hidden",
              bgcolor: "blueviolet",
              "&:hover": { bgcolor: "indigo" },
              "& .MuiTouchRipple-root span": {
                backgroundColor: "rgba() !important", // Change ripple color
              },
            }}>{btnname}</CustomButton>
                </div>
    );
}