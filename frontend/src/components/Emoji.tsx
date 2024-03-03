import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import React from "react";

type EmojiProps = {
    setMessage: React.Dispatch<React.SetStateAction<string>>;
};

function Emoji(props: EmojiProps) {
    const [emojiVisible, setEmojiVisible] = useState("hidden");
    const menuRef = useRef<HTMLDivElement>(null);

    //console.log("EMOJI RERENDERED");
    /**
     * Handles the click outside of the menu.
     * @param event - The mouse event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            const { left, top, right, bottom } = menuRef.current.getBoundingClientRect();
            const { clientX, clientY } = event;

            if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
                setEmojiVisible("hidden");
            }
        }
    };

    useEffect(() => {
        if (emojiVisible === "") {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiVisible]);

    function toggleEmojiWindow() {
        if (emojiVisible === "hidden") {
            setEmojiVisible("");
        } else {
            setEmojiVisible("hidden");
        }
    }

    function handleEmojiClick(emojiData: EmojiClickData, event: MouseEvent) {
        event.preventDefault();
        props.setMessage((prev) => prev + emojiData.emoji);
    }

    return (
        <>
            <button
                onClick={toggleEmojiWindow}
                className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <i className="far fa-smile">😊</i>
            </button>
            <div ref={menuRef} className={`absolute z-20 mb-24 ${emojiVisible}`}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
        </>
    );
}

export default React.memo(Emoji);
