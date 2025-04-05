import { useContext, useState } from "react";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AppContext } from "../AppContext";

export default function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const { mode, setMode } = useContext(AppContext);

    const modeChange = (newMode: 'speak' | 'emergency' | 'call') => {
        setMode(newMode);
        setSidebar(false);
    }

    const modeName = (mode: 'speak' | 'emergency' | 'call') => {
        return mode[0].toUpperCase() + mode.slice(1) + " Mode";
    }

    return <>
        <nav className="w-full bg-gray-800 flex items-center p-4">
            <div className="flex flex-col box-content rounded-lg px-2 hover:cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => setSidebar(!sidebar)}
            >
                <FontAwesomeIcon icon={faCircleUser} className="text-white text-3xl" />
                <div className="text-white mt-2">Options</div>
            </div>
            <div className="flex flex-row justify-center w-full">
                <span className="text-3xl text-white">{modeName(mode)}</span>
            </div>
        </nav>
        {sidebar && <>
        <div className="w-screen h-screen absolute inset-0 bg-grey opacity-10" onClick={() => setSidebar(false)}></div>
        <div className="fixed top-0 left-0 h-full w-[400px] max-w-[60vw] bg-gray-700 shadow-lg transition-transform duration-300">
            <button className="text-white p-4"
                onClick={() => setSidebar(false)}>
                Close
            </button>
            <div className="flex w-full flex-col items-center gap-4 mt-6">
                <div className="flex items-center flex-col bg-white box-content
                rounded-lg px-2 w-[35vw] max-w-[250px] hover:cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => modeChange('speak')}
                >
                    <img src={"/symbols/mulberry/message_bubble.png"} alt="Send" className="h-[20vh] object-contain" />
                    <div>Speak</div>
                </div>
                <div className="flex items-center flex-col bg-amber-200 box-content
                    rounded-lg px-2 w-[35vw] max-w-[250px] hover:cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => modeChange('emergency')}
                >
                    <img src={"/symbols/mulberry/emergency.png"} alt="Send" className="h-[20vh] object-contain" />
                    <div>EMERGENCY</div>
                </div>
                <div className="flex items-center flex-col bg-blue-200 box-content
                    rounded-lg px-2 w-[35vw] max-w-[250px] hover:cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => modeChange('call')}
                >
                    <img src={"/symbols/mulberry/iphone.svg"} alt="Send" className="h-[20vh] object-contain" />
                    <div>Phone Call</div>
                </div>
            </div>
        </div>
        </>}
    </>
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