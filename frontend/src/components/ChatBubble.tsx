import { useEffect, useRef, useState } from "react";
import { formatTime } from "../utils/time";

type messageProps = {
    message: string;
    isUser: boolean;
    name: string;
    profilePhoto: string;
};

function ChatBubble(props: messageProps) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [currentTime] = useState(formatTime(new Date()));

    /**
     * Handles the click outside of the menu.
     * @param event - The mouse event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            const { left, top, right, bottom } = menuRef.current.getBoundingClientRect();
            const { clientX, clientY } = event;

            if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
                setShowMenu(false);
            }
        }
    };

    useEffect(() => {
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className={`flex items-start ${props.isUser ? "flex-row-reverse" : ""} mb-4`}>
            <div className="relative mx-2 flex flex-col items-center">
                <img src={props.profilePhoto} alt={`${props.name}'s profile`} className="mb-1 h-10 w-10 rounded-full" />
                <button onClick={() => setShowMenu(!showMenu)} className="mt-2 text-gray-500 focus:outline-none">
                    •••
                </button>
                {showMenu && (
                    <div
                        className={`absolute ${props.isUser ? "right-0 mr-12" : "left-0 ml-12"} z-20 mt-2 w-48 rounded-md border-2 bg-white py-1 shadow-xl`}
                        ref={menuRef}
                    >
                        <button
                            className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                            onClick={() => console.log("Replying")}
                        >
                            Reply
                        </button>
                        <button
                            className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                            onClick={() => console.log("Editing")}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
            <div className={`flex flex-col ${props.isUser ? "items-end" : "items-start"}`}>
                <div className="text-xs">
                    <span className="font-semibold">{props.name}</span>{" "}
                    <span className="text-gray-500">{currentTime}</span>
                </div>
                <div
                    className={`mt-1 max-w-md rounded-lg px-4 py-2 md:max-w-2xl lg:max-w-4xl ${props.isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    {props.message}
                </div>
            </div>
        </div>
    );
}

export default ChatBubble;
