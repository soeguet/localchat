import useClientStore from "../../../stores/clientStore";
import useFontSizeStore from "../../../stores/fontSizeStore";
import { MessagePayload } from "../../../utils/customTypes";
import LinkifiedText from "./LinkifiedText";

type QuoteBubbleProps = {
    payload: MessagePayload;
};

function QuoteBubble(props: QuoteBubbleProps) {
    if (props.payload === undefined) {
        return null;
    }

    const fontSize = useFontSizeStore((state) => state.fontSize);

    const quotedClientName = useClientStore
        .getState()
        .clients.find(
            (c) => c.clientId === props.payload.clientType.clientId
        )?.clientUsername;

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
                        <LinkifiedText
                            text={props.payload.quoteType.quoteMessageContext}
                        />
                    </div>
                    <div className="mt-2 text-gray-500">
                        — {quotedClientName}, {props.payload.quoteType.quoteTime}
                    </div>
                </div>
            )}
        </>
    );
}

export default QuoteBubble;
