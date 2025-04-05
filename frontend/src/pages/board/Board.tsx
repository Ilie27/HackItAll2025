import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type ImageData = {
    id: string;
    path: string;
    files?: ImageData[];
};

const data: ImageData = {
    id: "",
    path: "",
    files: [{ 
        id: "quick chat", 
        path: "./assets/quick_chat.svg", 
        files: [{
            id: "yes",
            path: "./assets/quick_chat/yes.png"
        }, {
            id: "no",
            path: "./assets/quick_chat/no.png"
        }, {
            id: "maybe",
            path: "./assets/quick_chat/maybe.png"
        }]
    }, {
        id: "food",
        path: "./assets/food.svg",
        files: [{
            id: "soups",
            path: "./assets/food/soups.svg",
            files: [{
                id: "chicken soup",
                path: "./assets/food/soups/chicken_soup.png"
            }, {
                id: "vegetable soup",
                path: "./assets/food/soups/vegetable_soup.png"
            }]
        }, {
            id: "salads",
            path: "./assets/food/salads.svg",
            files: [{
                id: "caesar salad",
                path: "./assets/food/salads/caesar_salad.png"
            }, {
                id: "greek salad",
                path: "./assets/food/salads/greek_salad.png"
            }]
        }, {
            id: "toast",
            path: "./assets/food/toast.png",
        }, {
            id: "pizza",
            path: "./assets/food/pizza.png",
        }, {
            id: "burger",
            path: "./assets/food/burger.png",
        }]
    }, {
        id: "time",
        path: "./assets/time.svg",
        files: [{
            id: "morning",
            path: "./assets/time/morning.png"
        }, {
            id: "afternoon",
            path: "./assets/time/afternoon.png"
        }, {
            id: "evening",
            path: "./assets/time/evening.png"
        }]
    }]
}


export default function BoardPage() {
    const [category, setCategory] = useState<number[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [imageBar, setImageBar] = useState<string[]>(["placeholder"]);
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

    return <div className="w-full min-h-screen flex flex-col">
        <div className="w-full h-[20vh] bg-gray-200">
            <div id="image-bar" className="w-[90%] h-full flex flex-row justify-between items-left p-2">
                {imageBar.map((image, index) => 
                    <div key={index} className="w-[10%] h-full bg-gray-300 rounded-lg flex justify-center items-center">

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
        <div id="image-board" className="w-full flex flex-row flex-wrap p-2 items-start gap-2">
            {images.files?.map((file, index) =>
                !file.files ? (
                    <div key={index} className="w-[28vw] max-w-[300px] h-[25vh] bg-amber-200 rounded-lg ml-1 shadow-xl hover:border-gray-600 hover:border-2">

                    </div> 
                ) : (
                    <div key={index} className="w-[28vw] max-w-[300px] h-[25vh] bg-blue-300 ml-1 shadow-xl hover:border-gray-600 hover:border-2" onClick={() => enterFolder(index)}>
                        {file.id}
                    </div>
                )
            )}
        </div>
    </div>
}