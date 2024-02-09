import React from 'react';

type HeaderProps = {
    profileImageUrl: string;
    chatName: string;
    isConnected: boolean;
    unreadMessages: number;
};

function Header({ profileImageUrl, chatName, isConnected, unreadMessages }: HeaderProps) {
    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={profileImageUrl} alt="Profile" className="h-10 w-10 rounded-full mr-3" />
                <span>{chatName}</span>
            </div>
            <div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </span>
            </div>
            <div>
                <span className="bg-blue-100 text-blue-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    Unread Messages: {unreadMessages}
                </span>
            </div>
        </div>
    );
};

export default Header;
