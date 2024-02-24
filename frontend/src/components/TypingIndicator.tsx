import { getClientById } from "../stores/clientsStore";
import "./TypingIndicator.css";

const TypingIndicator = ({ typingUsers }: { typingUsers: string[] }) => {
    const typingUserNames = typingUsers.map((id) => {
        return getClientById(id)?.username || "Unknown";
    });

    const names = typingUserNames.join(", ");
    const text = typingUserNames.length > 1 ? "are typing" : "is typing";

    return (
        <div className="text-small mb-1 p-2 bg-gray-200 mx-auto rounded-lg shadow max-w-xs whitespace-nowrap overflow-hidden">
            <div className="flex items-center">
                <div className="text-ellipsis flex overflow-hidden">
                    {names} {text}
                    <div className="ml-1">
                        <span className="dots dot1">.</span>
                        <span className="dots dot2">.</span>
                        <span className="dots dot3">.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;
