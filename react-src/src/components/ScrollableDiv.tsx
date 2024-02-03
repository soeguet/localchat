import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble';

const ScrollableDiv = () => {
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const div: HTMLElement | null = document.getElementById('scrollable-div');
        if (div == null) {
            throw new Error();
        }
        const handleScroll = () => {
            if (div.scrollTop < div.scrollHeight - div.clientHeight) {
                setShowArrow(true);
            } else {
                setShowArrow(false);
            }
        };

        div.addEventListener('scroll', handleScroll);

        return () => {
            div.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToBottom = () => {
        const div = document.getElementById('scrollable-div');
        if (div == null) {
            throw new Error();
        }
        div.scrollTop = div.scrollHeight - div.clientHeight;
    };

    return (
        <>
            <div
                id="scrollable-div"
                className="overflow-auto border p-4"
            >
                <ChatBubble text={"henlo"}/>
                <ChatBubble text={"hey, was geht :D"}/>
                <ChatBubble text={"mir geht es wunderbar. wie geht es dir heute, wunderbarer tag heute :D"}/>
                <ChatBubble text={"henlo"}/>
                <ChatBubble text={"henlo"}/>
            </div>
            {showArrow && (
                <button
                    className="mb-9 absolute bottom-20 right-4 p-2 bg-gray-500 text-white rounded-full"
                    onClick={handleScrollToBottom}
                >
                    <span className="fas fa-chevron-down">v</span>
                </button>
            )}
        </>
    );
};

export default ScrollableDiv;
