import { QuoteType } from "../utils/customTypes";

function QuoteBubble(props: QuoteType) {
    return (
        <div className="">
            <div className="text-sm text-gray-800">{props.message}</div>
            <div className="mt-2 text-xs text-gray-500">
                — {props.sender}, {props.time}
            </div>
        </div>
    );
}

export default QuoteBubble;
