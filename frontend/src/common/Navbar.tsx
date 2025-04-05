import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    
    return <nav className="w-full bg-gray-800 flex justify-between items-center p-4">
        <div className="w-full flex flex-row flex-wrap p-2 items-start gap-4">
            <div className="flex items-center flex-col bg-amber-200 box-content
                    rounded-lg px-2"
                onClick={() => navigate('/emergency')}
            >
                <img src={"/symbols/mulberry/emergency.png"} alt="Send" className="w-[20vw] max-w-[250px] h-[15vh] object-contain" />
                <div>EMERGENCY</div>
            </div>
        </div>
        <div className="w-full flex flex-row flex-wrap p-2 items-start gap-4">
            <div className="flex items-center flex-col bg-blue-200 box-content
                    rounded-lg px-2"
                onClick={() => { }}
            >
                <img src={"/symbols/mulberry/iphone.svg"} alt="Send" className="w-[20vw] max-w-[250px] h-[15vh] object-contain" />
                <div>Phone Call</div>
            </div>
        </div>
        <div className="w-full flex flex-row flex-wrap p-2 items-start gap-4">
            <div className="flex items-center flex-col bg-white box-content
                    rounded-lg px-2"
                onClick={() => { }}
            >
                <img src={"/symbols/mulberry/message_bubble.png"} alt="Send" className="w-[20vw] max-w-[250px] h-[15vh] object-contain" />
                <div>Message</div>
            </div>
        </div>
    </nav>
}

// export default function ImageButton({ onClick }: { onClick: () => void }) {
//     return (
//       <button
//         onClick={onClick}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
//       >
//         <img src={"/symbols/mulberry/emergency.png"} alt="Send" className="w-6 h-6 mr-2" />
//         Send Message
//       </button>
//     );
//   }