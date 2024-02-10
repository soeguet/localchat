import { socket } from "../utils/socket";

type HeaderProps = {
    profileImageUrl: string;
    chatName: string;
    isConnected: boolean;
    unreadMessages: number;
    onReconnect: (socket:WebSocket) => void; // Funktion zum Wiederverbinden
};

function Header({ profileImageUrl, chatName, isConnected, unreadMessages, onReconnect }: HeaderProps) {

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={profileImageUrl} alt="Profile" className="h-10 w-10 rounded-full mr-3" />
                <span className="font-medium">{chatName}</span>
            </div>
            <div>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </span>
                {!isConnected && (
                    <button onClick={() =>onReconnect(socket)} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
                        Reconnect
                    </button>
                )}
            </div>
            <div>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${unreadMessages > 0 ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}>
                    Unread: {unreadMessages}
                </span>
            </div>
        </div>
    );
};

export default Header;