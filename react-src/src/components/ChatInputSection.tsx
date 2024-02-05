import { useState } from 'react';

type inputProps = {
    onSend: (message: string) => void;
};

const ChatInputSection = (props: inputProps) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            props.onSend(message);
            setMessage('');
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex items-end p-4 gap-2 bg-white border-t border-gray-200">
            <button className="my-auto mx-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                <i className="far fa-smile">😊</i>
            </button>
            <button className="my-auto mx-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                <i className="far fa-paperclip">📎</i>
            </button>
            <textarea
                className="mx-2 flex-1 my-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            ></textarea>
            <button
                className="my-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={handleSendMessage}
            >
                Send
            </button>
        </div>
    );
};

export default ChatInputSection;
