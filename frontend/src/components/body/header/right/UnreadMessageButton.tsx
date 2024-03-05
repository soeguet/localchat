import useUnseenMessageCountStore from "../../../../stores/unseenMessageCountStore";
import UnreadMessagesSvg from "../../../svgs/messages/UnreadMessagesSvg";

function UnreadMessageButton() {

    const unseenMessageCount = useUnseenMessageCountStore(
        (state) => state.unseenMessageCount
    );

    return (
        <div>
            {unseenMessageCount > 0 && (
                <button className="rounded-full border-2 border-black text-white hover:bg-gray-500">
                    <UnreadMessagesSvg />
                </button>
            )}
        </div>
    );
}

export default UnreadMessageButton;