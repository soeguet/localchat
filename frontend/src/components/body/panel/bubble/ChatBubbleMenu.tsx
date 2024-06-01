import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { handleClickOutsideOfDiv } from "../../../../utils/handleClickOutsideOfDiv";

type ChatBubbleMenuProps = {
    showMenu: boolean;
    setShowMenu: (show: boolean) => void;
    activateReplyMessage: () => void;
    thisMessageFromThisClient: boolean;
};

function ChatBubbleMenu(props: ChatBubbleMenuProps) {
    const { t } = useTranslation();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.showMenu) {
            document.addEventListener("mousedown", (event) =>
                handleClickOutsideOfDiv(menuRef, event, props.setShowMenu)
            );
        }

        return () => {
            document.removeEventListener("mousedown", (event) =>
                handleClickOutsideOfDiv(menuRef, event, props.setShowMenu)
            );
        };
    }, [props.showMenu]);

    return (
        <>
            {props.showMenu && (
                <div
                    className={`absolute ${props.thisMessageFromThisClient ? "right-0 mr-20" : "left-0 ml-20"} z-20 mt-2 w-48 rounded-md border-2 bg-white py-1 shadow-xl`}
                    ref={menuRef}
                >
                    <button
                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                        onClick={props.activateReplyMessage}
                    >
                        {t("menu_item_reply")}
                    </button>
                    {props.thisMessageFromThisClient && (
                        <>
                            <button
                                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                                onClick={() => console.log("Editing")}
                            >
                                {t("menu_item_edit")}
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                                onClick={() => console.log("Deleting")}
                            >
                                {t("menu_item_delete")}
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export { ChatBubbleMenu };
