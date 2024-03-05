import FlagButton from "./FlagButton";
import FontSizeButton from "./FontSizeButton";
import UnreadMessageButton from "./UnreadMessageButton";

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
