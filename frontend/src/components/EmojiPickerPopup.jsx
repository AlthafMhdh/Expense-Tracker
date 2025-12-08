import React, { useState } from "react"
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, SetIsOpen] = useState(false);

    return(
        // <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
        <div className="relative mb-6 w-fit">
            <div 
                className="flex items-center gap-4 cursor-pointer"
                onClick={()=> SetIsOpen(true)}
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
                    {icon ? (
                        <img src={icon} alt="icon" className="w-12 h-12"/>
                        ) : (
                        <LuImage/>    
                    )}
                </div>

                <p className="">{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                // <div className="relative">
                <div className="absolute top-full mt-2 z-50">
                    <button
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                        onClick={()=> SetIsOpen(false)}
                    >
                        <LuX/>
                    </button>
                    
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emoji) => {
                            onSelect(emoji?.imageUrl || "");
                            SetIsOpen(false);
                        }}
                    />
                </div>
            )}
        </div>

    )
}
export default EmojiPickerPopup;
