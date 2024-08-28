import {useClientStore} from "../../../../stores/clientStore";
import {useUnseenMessageCountStore} from "../../../../stores/unseenMessageCountStore";
import type {MessagePayload} from "../../../../utils/types/customTypes";
import {QuoteBubble} from "../QuoteBubble";
import {base64ToUtf8} from "../../../../utils/transformation/encoder";
import {ReactionField} from "./reaction/ReactionField";
import {EditMessageMode} from "./EditMessageMode";
import PictureBubblePanel from "./picture/PictureBubblePanel";
import {
    DEFAULT_HOVER_COLOR, DEFAULT_OTHER_CLIENT_COLOR,
    DEFAULT_STROKE_COLOR,
    DEFAULT_THIS_CLIENT_COLOR
} from "../../../../utils/variables/variables";

type ChatBubbleBottomPartProps = {
    messagePayload: MessagePayload;
    enableMessageEditingMode: boolean;
    setEnableMessageEditingMode: (enable: boolean) => void;
    thisMessageFromThisClient: boolean;
};

function ChatBubbleBottomPart(props: ChatBubbleBottomPartProps) {

    // states
    const clientColor = useClientStore(
        (state) =>
            state.clients.find((c): boolean => {
                return (
                    c.clientDbId === props.messagePayload.clientType.clientDbId
                );
            })?.clientColor,
    );
    const unseenMessagesIdList = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList,
    );
    const thisMessageUnseen = unseenMessagesIdList.includes(
        props.messagePayload.messageType.messageDbId,
    );
    // states

    const determineBorderColor = () => {
        let borderColor = props.messagePayload.messageType.edited
            ? "border-amber-700"
            : "border-black";

        if (thisMessageUnseen) {
            borderColor = "border-orange";
        }
        return borderColor;
    }

    const determineMargin = () => {
        let margin = "";

        if (
            props.messagePayload.reactionType !== undefined &&
            props.messagePayload.reactionType?.length > 0
        ) {
            margin = "mb-7";
        }
        return margin;
    };

    return (
        <>
            <div className={determineMargin()}>
                <div
                    className={`relative max-w-md  break-words rounded-lg border peer-focus/edit:animate-pulse ${determineBorderColor()} px-4 py-2 md:max-w-2xl lg:max-w-4xl`}
                    style={{
                        backgroundColor: clientColor ?? (props.thisMessageFromThisClient ? DEFAULT_THIS_CLIENT_COLOR : DEFAULT_OTHER_CLIENT_COLOR),
                        color: "#fff",
                        animation: thisMessageUnseen
                            ? "pulse-border 3.5s infinite ease-in-out"
                            : "",
                        borderWidth: thisMessageUnseen ? "2px" : "1px",
                    }}>
                    {props.messagePayload.imageType && (
                        <PictureBubblePanel
                            messagePayload={props.messagePayload}
                        />
                    )}

                    <QuoteBubble payload={props.messagePayload} />
                    {props.enableMessageEditingMode ? (
                        <EditMessageMode
                            messagePayload={props.messagePayload}
                            setEnableMessageEditingMode={
                                props.setEnableMessageEditingMode
                            }
                        />
                    ) : (
                        <div className="whitespace-pre-wrap">
                            {base64ToUtf8(props.messagePayload.messageType.messageContext)}
                        </div>
                    )}
                    {/* // TODO re-enable links in message
					<LinkifiedText
						text={props.messagePayload.messageType.messageContext}
					/>*/}
                    {props.messagePayload.reactionType &&
                        props.messagePayload.reactionType.length > 0 && (
                            <ReactionField
                                messagePayload={props.messagePayload}
                            />
                        )}
                </div>
            </div>
        </>
    );
}

export {ChatBubbleBottomPart};