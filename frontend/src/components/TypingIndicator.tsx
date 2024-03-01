import { getClientById } from "../stores/clientsStore";
import useTypingStore from "../stores/typingStore";
import "./TypingIndicator.css";

const TypingIndicator = () => {
    const typingUsers: string[] = useTypingStore((state) => state.typingClientIds);

    const typingUserNames: string[] = typingUsers.map((id) => {
        return getClientById(id)?.username || "Unknown";
    });

    const names = typingUserNames.join(", ");
    const text = typingUserNames.length > 1 ? "are typing" : "is typing";

    return (
        <>
            {typingUserNames.length > 0 && (
                <div className="fixed z-50 max-w-xs p-2 mb-3 text-xs transform -translate-x-1/2 bg-gray-200 border border-black rounded-lg shadow bottom-24 left-1/2">
                    <div className="flex items-center">
                        <div className="flex overflow-hidden text-black">
                            {names} {text}
                            <div className="ml-1">
                                <span className="dots dot1">.</span>
                                <span className="dots dot2">.</span>
                                <span className="dots dot3">.</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TypingIndicator;