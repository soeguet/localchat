import { useClientStore } from "../../../stores/clientStore";
import { useFontSizeStore } from "../../../stores/fontSizeStore";
import { MessagePayload } from "../../../utils/customTypes";
import { LinkifiedText } from "./LinkifiedText";
import {base64ToUtf8} from "../../../utils/encoder";

type QuoteBubbleProps = {
    payload: MessagePayload;
};

function QuoteBubble(props: QuoteBubbleProps) {
    if (props.payload === undefined || props.payload.quoteType === null) {
        return null;
    }

    const fontSize = useFontSizeStore((state) => state.fontSize);

    const quotedClientName = useClientStore
        .getState()
        .clients.find(
            (c) => c.clientDbId === props.payload.clientType.clientDbId
        )?.clientUsername;

    const base64DecodedQuoteMessage = base64ToUtf8(
        props.payload.quoteType!.quoteMessageContext
    );

    return (
        <>
            {props.payload.quoteType && (
                <div
                    className="my-1 rounded-md border-l-4 border-blue-300 bg-gray-100 bg-opacity-70 p-2"
                    style={{
                        fontSize: `${fontSize - 3}px`,
                    }}
                >
                    <div className="text-gray-800">
                        {base64DecodedQuoteMessage}
                        {/* <LinkifiedText
                            text={props.payload.quoteType.quoteMessageContext}
                        /> */}
                    </div>
                    <div className="mt-2 text-gray-500">
                        — {quotedClientName},{" "}
                        {props.payload.quoteType.quoteTime}
                    </div>
                </div>
            )}
        </>
    );
}

export { QuoteBubble };
