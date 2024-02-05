import { useState } from "react";

type messageProps = {
    message: string;
    isUser: boolean;
    name: string; time: string; profilePhoto: string;
};


const ChatBubble = (props: messageProps) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        // <div className={`flex items-end ${props.isUser ? 'flex-row-reverse' : ''} space-x-2 space-x-reverse mb-4`}>
        //     <img src={props.profilePhoto} alt={`${props.name}'s profile`} className="w-10 h-10 rounded-full" />
        //     <div>
        //         <div className={`text-xs ${props.isUser ? 'text-right' : 'text-left'}`}>
        //             <span className="font-semibold">{props.name}</span> <span className="text-gray-500">{props.time}</span>
        //         </div>
        //         <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${props.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
        //             {props.message}
        //         </div>
        //     </div>
        // </div>
        <div className={`flex ${props.isUser ? 'flex-row-reverse' : ''} items-end space-x-4 mb-4`}>
            <img src={props.profilePhoto} alt={`${name}'s profile`} className="w-10 h-10 rounded-full" />
            <div className="flex flex-col">
                <div className={`text-xs ${props.isUser ? 'text-right' : 'text-left'}`}>
                    <span className="font-semibold">{props.name}</span> <span className="text-gray-500">{props.time}</span>
                </div>
                <div className={`relative max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${props.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {props.message}
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full text-gray-800 focus:outline-none"
                    >
                        •••
                    </button>
                    {showMenu && (
                        <div className="absolute top-full right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                            <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => console.log('Replying')}>
                                Reply
                            </button>
                            <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => console.log('Editing')}>
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
