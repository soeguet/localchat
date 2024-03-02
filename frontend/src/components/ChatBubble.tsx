import React, { useEffect, useRef, useState } from "react";
import useReplyStore from "../stores/replyStore";
import { MessageProps } from "../utils/customTypes";
import QuoteBubble from "./QuoteBubble";
import ProfilePicture from "./ProfilePicture";
import useClientsStore, { getClientById } from "../stores/clientsStore";
import { useTranslation } from "react-i18next";
import LinkifyText from "./LinkifiedText";
import useFontSizeStore from "../stores/fontSizeStore";
import { getTimeWithHHmmFormat } from "../utils/time";
import useUserStore from "../stores/userStore";

function ChatBubble(props: MessageProps) {
    const { t } = useTranslation();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const currentTime = props.messagePayload.messageType.time;
    const clientId = useUserStore((state) => state.myId);
    const clientUsername = useUserStore((state) => state.myUsername);
    const fontSize = useFontSizeStore((state) => state.fontSize);
    const clientColor = useClientsStore(
        (state) => state.clients.find((c) => c.id === props.messagePayload.userType.clientId)?.clientColor
    );
    const thisMessageFromThisClient = props.messagePayload.userType.clientId === clientId;

    // /**
    //  * Handles the click outside of the menu.
    //  * @param event - The mouse event object.
    //  */
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            const { left, top, right, bottom } = menuRef.current.getBoundingClientRect();
            const { clientX, clientY } = event;

            if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
                setShowMenu(false);
            }
        }
    };

    function activateReplyMessage() {
        useReplyStore.getState().setReplyMessage({
            id: props.messagePayload.messageType.messageId,
            senderId: props.messagePayload.userType.clientId,
            username: props.messagePayload.userType.clientUsername,
            time: getTimeWithHHmmFormat(new Date()),
            message: props.messagePayload.messageType.message,
        });
    }

    useEffect(() => {
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className={`flex items-end ${thisMessageFromThisClient ? "flex-row-reverse" : ""} ${!props.lastMessageFromThisClientId && !props.lastMessageTimestampSameAsThisOne ? "mt-3" : "mt-1"}`}>
            <div onClick={() => setShowMenu(!showMenu)} className="relative flex flex-col items-center mx-2">
                <ProfilePicture
                    clientId={props.messagePayload.userType.clientId}
                    style={{
                        width: props.lastMessageFromThisClientId? "75px":"75px",
                        height: props.lastMessageFromThisClientId? "40px":"75px",
                        borderColor: clientColor || "lightgrey",
                        opacity: props.lastMessageFromThisClientId ? "0" : "1",
                    }}
                />
                {showMenu && (
                    <div
                        className={`absolute ${thisMessageFromThisClient ? "right-0 mr-20" : "left-0 ml-20"} z-20 mt-2 w-48 rounded-md border-2 bg-white py-1 shadow-xl`}
                        ref={menuRef}
                    >
                        <button
                            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                            onClick={activateReplyMessage}
                        >
                            {t("menu_item_reply")}
                        </button>
                        <button
                            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                            onClick={() => console.log("Editing")}
                        >
                            {t("menu_item_edit")}
                        </button>
                    </div>
                )}
            </div>

            <div className={`flex flex-col ${thisMessageFromThisClient ? "items-end" : "items-start"}`}>
                <div
                    style={{
                        fontSize: `${fontSize - 5}px`,
                    }}
                >
                    {!props.lastMessageFromThisClientId && <span className="font-semibold">{clientUsername}</span>}{" "}
                    {!props.lastMessageTimestampSameAsThisOne && <span className="text-gray-500">{currentTime}</span>}
                </div>

                <div
                    className={`border border-black break-words max-w-md rounded-lg px-4 py-2 md:max-w-2xl lg:max-w-4xl ${thisMessageFromThisClient ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}
                    style={{
                        backgroundColor: clientColor,
                    }}
                >
                    {props.messagePayload.quoteType && (
                        <div className="">
                            <QuoteBubble
                                message={props.messagePayload.quoteType.quoteMessage}
                                time={props.messagePayload.quoteType.quoteTime}
                                sender={
                                    getClientById(props.messagePayload.quoteType.quoteSenderId)?.username || "Unknown"
                                }
                            />
                        </div>
                    )}
                    <LinkifyText text={props.messagePayload.messageType.message} />
                </div>
            </div>
        </div>
    );
}

export default React.memo(ChatBubble);
