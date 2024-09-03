import { useClientStore } from "../../../../../stores/clientStore";
import { useFontSizeStore } from "../../../../../stores/fontSizeStore";
import { base64ToUtf8 } from "../../../../../utils/transformation/encoder";
import type { MessagePayload } from "../../../../../utils/types/customTypes";
import { DEFAULT_HOVER_COLOR } from "../../../../../utils/variables/variables";

type QuoteBubbleProps = {
	payload: MessagePayload;
};

function nullChecks(payload: MessagePayload) {
	if (payload === undefined || payload === null) {
		return null;
	}

	if (payload.quoteType === undefined || payload.quoteType === null) {
		return null;
	}

	if (
		payload.quoteType.quoteClientId === undefined ||
		payload.quoteType.quoteClientId === null
	) {
		return null;
	}

	if (
		payload.quoteType.quoteMessageContext === undefined ||
		payload.quoteType.quoteMessageContext === null
	) {
		return null;
	}
	return payload.quoteType;
}

function QuoteBubble(props: QuoteBubbleProps) {
	const quoteType = nullChecks(props.payload);

	if (
		quoteType === null ||
		quoteType.quoteClientId === null ||
		quoteType.quoteMessageContext === null
	) {
		return null;
	}

	const quotedClientId = quoteType.quoteClientId;
	const quoteMessageContext = quoteType.quoteMessageContext;

	// state
	const fontSize = useFontSizeStore((state) => state.fontSize);
	const quotedClientColor = useClientStore(
		(state) => state.clientMap.get(quotedClientId)?.clientColor,
	);
	const quotedClientName = useClientStore(
		(state) => state.clientMap.get(quotedClientId)?.clientUsername,
	);
	// state

	const base64DecodedQuoteMessage = base64ToUtf8(quoteMessageContext);

	return (
		<>
			{props.payload.quoteType && (
				<div
					className="my-1 rounded-md border-l-4 border-opacity-30  bg-gray-100 bg-opacity-70 p-2"
					data-testid="quote-bubble"
					style={{
						borderColor: quotedClientColor ?? DEFAULT_HOVER_COLOR,
						fontSize: `${fontSize - 3}px`,
					}}>
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