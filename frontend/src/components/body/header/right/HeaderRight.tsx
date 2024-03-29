import FlagButton from "./flag/FlagButton";
import FontSizeButton from "./fontsize/FontSizeButton";
import UnreadMessageButton from "./unread/UnreadMessageButton";

function HeaderRight() {
    return (
        <div className="flex items-center justify-between">
            <UnreadMessageButton />
            <FontSizeButton />
            <FlagButton />
        </div>
    );
}

export default HeaderRight;
