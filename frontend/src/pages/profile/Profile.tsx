import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom';
import speak from "../../text_to_speech"

export default function Profile() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const pages = [<DisabilitySelect />, <PersonalDetails />, <MoreDetails />]

    return <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 pb-10">
        <div className="w-[90%] md:w-1/2 flex justify-between mb-4 space-x-4 text-3xl">
            <button onClick={() => setPage(page - 1)} className={"bg-gray-300 text-gray-700 rounded p-2 hover:bg-gray-400 " + (page == 0 ? "opacity-0" : "")}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back
            </button>
        </div>
        {pages[page]}
        <div className="w-[90%] md:w-1/2 px-5 flex justify-center mt-4 space-x-4 text-xl">
    <button onClick={() => {
        if (page < pages.length - 1) {
            setPage(page + 1);
        } else {
            navigate('/board');
        }
    }} className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 px-20 py-4">{page < 2 ? "Next" : "Finish"} </button>
        </div>
    </div>
}

function PersonalDetails() {
    return <div className="w-[90%] md:w-1/2 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-10">Can you provide us some details about yourself</h2>
        <form className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="fname" className="text-gray-700 text-2xl">First name</label>
                <input type="text" id="fname" className="border-gray-300 rounded p-2 text-xl border-dashed border-0 border-b-2" placeholder="Enter your first name" />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="age" className="text-gray-700 text-2xl">Age</label>
                <input type="number" id="age" className="border-gray-300 rounded p-2 text-xl border-dashed border-0 border-b-2" placeholder="Enter your age" />
            </div>
        </form>
    </div>
}

function DisabilitySelect() {
    const [selectedDisability, setSelectedDisability] = useState<DisabilityType>('autism');

    type DisabilityDesc = { name: string, icon: string, type: DisabilityType };
    type DisabilityType = 'autism' | 'idd' | 'speech';

    const disablities: DisabilityDesc[] = [
        { name: 'Autism Spectrum', icon: '/images/autism_spectrum.png', type: 'autism' },
        { name: 'Cognitive Disorder', icon: '/images/cognitive_disorder.png', type: 'idd' },
        { name: 'Speech Disorder', icon: '/images/speech_disorder.png', type: 'speech' },
    ];

    return <div className="w-[90%] md:w-1/2 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-4">Disability Type</h2>
        <div className="flex flex-col space-y-4 mx-10">
            {disablities.map((disability) => (
                <div className={"w-full rounded-lg p-2 shadow-md flex flex-col items-center hover:shadow-blue-100 transition hover:shadow-md " +
                    (disability.type === selectedDisability ? "bg-blue-100" : "bg-gray-50")}
                onClick={() => {
                    setSelectedDisability(disability.type);
                    speak(disability.name);
                }} key={disability.type}>
                    <img src={disability.icon} alt={disability.name} className="w-10 h-10 mx-auto" />
                    <span className="text-xl">{disability.name}</span>
                </div>
            ))}
        </div>
    </div>
}

function MoreDetails() {
    return <div className="w-[90%] md:w-1/2 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-4">Can you tell us a bit more about your disability?</h2>
        <div className="flex flex-col space-y-4 mx-1">
            <textarea className="w-full h-64 border border-gray-300 rounded p-2 text-2xl" placeholder="Enter a description of your disability"></textarea>
        </div>
    </div>
}