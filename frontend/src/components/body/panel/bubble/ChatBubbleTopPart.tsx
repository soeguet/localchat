import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../../stores/clientStore";
import { useFontSizeStore } from "../../../../stores/fontSizeStore";
import type { MessagePayload } from "../../../../utils/customTypes";
import { ChatMessageSenderName } from "./ChatMessageSenderName";
import { ChatMessageTimestamp } from "./ChatMessageTimestamp";

type ChatBubbleTopPartProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

function ChatBubbleTopPart(props: ChatBubbleTopPartProps) {
    const { t } = useTranslation();
    const messageSenderUsername = useClientStore(
        (state) =>
            state.clients.find(
                (c) =>
                    c.clientDbId === props.messagePayload.clientType.clientDbId
            )?.clientUsername
    );
    const fontSize = useFontSizeStore((state) => state.fontSize);
    return (
        <>
            <div
                style={{
                    fontSize: `${fontSize - 5}px`,
                }}
            >
                {props.messagePayload.messageType.edited && (
                    <span className="mx-2 animate-pulse text-xs text-amber-700 transition ease-in-out">
                        {t("edited_label")}
                    </span>
                )}

                <ChatMessageSenderName
                    messageSenderUsername={messageSenderUsername || "Unknown"}
                    lastMessageFromThisClientId={
                        props.lastMessageFromThisClientId
                    }
                />
                <ChatMessageTimestamp
                    messagePayload={props.messagePayload}
                    lastMessageFromThisClientId={
                        props.lastMessageFromThisClientId
                    }
                    lastMessageTimestampSameAsThisOne={
                        props.lastMessageTimestampSameAsThisOne
                    }
                />
            </div>
        </>
    );
}

export { ChatBubbleTopPart };
