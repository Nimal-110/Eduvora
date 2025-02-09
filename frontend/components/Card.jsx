export default function Card({title,content,btnname}){
    return(
        <div>
            <div className="bg-white text-gray-800 p-6 shadow-lg rounded-xl hover:shadow-2xl transition w-[350px] h-[200px]">
            <h2 className="text-xl font-semibold">{title}</h2>
            {/* 20 words can only fit */}
            <p className="text-gray-600 h-[60px]">{content}</p>
            <button className="mt-4 p-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:opacity-90">
              {btnname}
            </button>
          </div>
        </div>
    );
}