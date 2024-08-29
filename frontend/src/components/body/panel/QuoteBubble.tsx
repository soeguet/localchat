import { useClientStore } from "../../../stores/clientStore";
import { useFontSizeStore } from "../../../stores/fontSizeStore";
import type { MessagePayload } from "../../../utils/types/customTypes";
import { base64ToUtf8 } from "../../../utils/transformation/encoder";
import {DEFAULT_HOVER_COLOR} from "../../../utils/variables/variables";

type QuoteBubbleProps = {
	payload: MessagePayload;
};

function QuoteBubble(props: QuoteBubbleProps) {
	if (props.payload === undefined || props.payload.quoteType === null) {
		return null;
	}
	if (
		props.payload.quoteType === undefined ||
		!props.payload.quoteType.quoteMessageContext
	) {
		return;
	}
	const fontSize = useFontSizeStore((state) => state.fontSize);
	const quotedClientColor = useClientStore(
		(state) =>
			state.clients.find(
				(c) => c.clientDbId === props.payload.quoteType?.quoteClientId,
			)?.clientColor,
	);

	const quotedClientName = useClientStore(
		(state) =>
			state.clients.find(
				(c) => c.clientDbId === props.payload.quoteType?.quoteClientId,
			)?.clientUsername,
	);

	const base64DecodedQuoteMessage = base64ToUtf8(
		props.payload.quoteType.quoteMessageContext,
	);

	return (
		<>
			{props.payload.quoteType && (
				<div
					className="my-1 rounded-md border-l-4 border-opacity-30  bg-gray-100 bg-opacity-70 p-2"
					data-testid="quote-bubble"
					style={{
						borderColor: quotedClientColor ?? DEFAULT_HOVER_COLOR,
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
						{`— ${quotedClientName}, ${props.payload.quoteType.quoteTime}`}
					</div>
				</div>
			)}
		</>
	);
}

export { QuoteBubble };