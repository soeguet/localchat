import { useUnseenMessageCountStore } from "../../../../../stores/unseenMessageCountStore";
import { scrollToBottom } from "../../../../../utils/functionality";
import { UnreadMessagesSvg } from "../../../../svgs/messages/UnreadMessagesSvg";

function UnreadMessageButton() {
    const unseenMessageCount = useUnseenMessageCountStore(
        (state) => state.unseenMessageCount
    );

    return (
        <>
            {unseenMessageCount > 0 && (
                <button
                    data-testid="unread-message-button"
                    onClick={async () => {
                        await scrollToBottom();
                    }}
                    className="rounded-full border-2 border-black text-white hover:bg-gray-500"
                >
                    <UnreadMessagesSvg />
                </button>
            )}
        </>
    );
}

export  { UnreadMessageButton };