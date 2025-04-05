import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ImageData, data } from "./file_paths";

export default function BoardPage() {
    const [category, setCategory] = useState<number[]>([]);
    const [imageBar, setImageBar] = useState<{id: string, path: string}[]>([]);
    const images: ImageData = category.reduce((acc: ImageData, key: number) => {
        return acc.files?.[key] as ImageData;
    }, data);

    const enterFolder = (key: number) => {
        const newCategory = [...category, key];
        setCategory(newCategory);
    }

    const goBack = () => {
        const newCategory = [...category];
        newCategory.pop();
        setCategory(newCategory);
    }

    const addImage = (id: string, path: string) => {
        const newImageBar = [...imageBar, { id, path }];
        setImageBar(newImageBar);
    }

    const removeImage = (index: number) => {
        const newImageBar = [...imageBar];
        newImageBar.splice(index, 1);
        setImageBar(newImageBar);
    }

    return <div className="w-full min-h-screen flex flex-col">
        <div className="w-full h-[22vh] bg-gray-200">
            <div id="image-bar" className="w-[90%] h-full flex flex-row items-left p-4">
                {imageBar.map(({id, path}, index) => 
                    <div key={index} className="flex-col w-[28vw] max-w-[200px] h-full bg-gray-300 rounded-lg flex justify-center items-center mr-5 py-2
                    stripped-out" onClick={() => removeImage(index)}>
                        <img src={path} alt={id} className="w-full h-[75%] object-contain rounded-lg" />
                        <div>{id}</div>
                    </div>
                )}
            </div>
            {/* buttons */}
        </div>
        <div className="w-full h-[75px] bg-gray-800 flex flex-row">
            <div className="flex flex-row items-center hover:cursor-pointer hover:bg-gray-600">
                <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} 
                    className="text-white text-2xl p-5"/>
            </div>
            <div className="flex flex-row items-center justify-center w-full">
                <h1 className="text-white text-3xl font-bold">{images.id || ''}</h1>  
            </div>
        </div>
        <div id="image-board" className="w-full flex flex-row flex-wrap p-2 items-start gap-4">
            {images.files?.map((file, index) =>
                <div key={index} className={"flex flex-col items-center justify-center w-[27vw] max-w-[300px] h-[25vh] p-2 " +
                    (!file.files ? "bg-amber-200" : "bg-blue-300") + 
                    " rounded-lg ml-1 shadow-xl hover:border-gray-600 hover:border-2"}
                    onClick={() => file.files ? 
                        enterFolder(index) : addImage(file.id, file.path)}>
                        <img src={file.path} alt={file.id} className="h-[80%] object-cover rounded-lg" />
                        <div>{file.id}</div>
                </div>)}
        </div>
    </div>
}