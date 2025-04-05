import { useState } from "react";
import { ImageCategory } from "./data";

export default function BoardPage() {
    const [category, setCategory] = useState<ImageCategory>(null);
    const [image, setImage] = useState<string | null>(null);
    const [imageList, setImageList] = useState<string[]>([]);
    const [imageBar, setImageBar] = useState<string[]>([]);

    return <div className="w-full min-h-screen flex flex-col">
        <div id="image-bar" className="">

        </div>
        <div id="image-board" className="w-full flex flex-row justify-">
            
        </div>
    </div>
}