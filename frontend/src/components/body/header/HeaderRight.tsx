import i18n from "../../../config/i18n";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";
import { switchLanguage } from "../../../utils/i18n-helper";
import FontSizePopup from "../../FontSizePopup";
import AmericanFlag from "../../svgs/flags/AmericanFlag";
import GermanFlag from "../../svgs/flags/GermanFlag";
import UnreadMessages from "../../svgs/messages/UnreadMessages";

function HeaderRight() {

    const unseenMessageCount = useUnseenMessageCountStore((state) => state.unseenMessageCount);

    return (
        <div className="flex items-center justify-between">
            <div>
                {unseenMessageCount > 0 && (
                    <button className="rounded-full border-2 border-black text-white hover:bg-gray-500">
                        <UnreadMessages />
                    </button>
                )}
            </div>
            <div className="mx-3">
                <FontSizePopup />
            </div>
            <div>
                <button
                    onClick={() => switchLanguage()}
                    className="rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500"
                >
                    {i18n.language === "en" ? <AmericanFlag /> : <GermanFlag />}
                </button>
            </div>
        </div>
    );
}

export default HeaderRight;
