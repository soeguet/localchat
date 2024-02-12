import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";

type EmojiProps = {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
};

function Emoji(props: EmojiProps) {
    const [emojiVisible, setEmojiVisible] = useState("hidden");

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
            <div className={`absolute z-20 mb-20 ${emojiVisible}`}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
        </>
    );
}

export default Emoji;
