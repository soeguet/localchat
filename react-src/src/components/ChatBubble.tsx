import { useState } from "react";

type messageProps = {
    message: string;
    isUser: boolean;
    name: string;
    time: string;
    profilePhoto: string;
};

const ChatBubble = (props: messageProps) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={`flex items-start ${props.isUser ? 'flex-row-reverse' : ''} mb-4`}>
            <div className="relative flex flex-col items-center mx-2">
                <img src={props.profilePhoto} alt={`${props.name}'s profile`} className="w-10 h-10 rounded-full mb-1" />
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-gray-500 focus:outline-none mt-2"
                >
                    •••
                </button>
                {showMenu && (
                    <div className={`absolute ${props.isUser ? 'right-0 mr-12' : 'left-0 ml-12'} mt-2 py-1 w-48 bg-white rounded-md shadow-xl z-20`}>

                        <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => console.log('Replying')}>
                            Reply
                        </button>
                        <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => console.log('Editing')}>
                            Edit
                        </button>
                    </div>
                )}
            </div>
            <div className={`flex flex-col ${props.isUser ? 'items-end' : 'items-start'}`}>
                <div className="text-xs">
                    <span className="font-semibold">{props.name}</span> <span className="text-gray-500">{props.time}</span>
                </div>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg mt-1 ${props.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {props.message}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
