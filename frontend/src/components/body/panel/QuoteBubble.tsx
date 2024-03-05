import useFontSizeStore from "../../../stores/fontSizeStore";
import LinkifiedText from "./LinkifiedText";

type QuoteBubbleProps = {
    message: string;
    sender: string;
    time: string;
};

function QuoteBubble({ message, sender, time }: QuoteBubbleProps) {
    const fontSize = useFontSizeStore((state) => state.fontSize);
    return (
        <div
            className="my-1 rounded-md border-l-4 border-blue-300 bg-gray-100 bg-opacity-70 p-2"
            style={{
                fontSize: `${fontSize - 3}px`,
            }}
        >
            <div className="text-gray-800">
                <LinkifiedText text={message} />
            </div>
            <div className="mt-2 text-gray-500">
                — {sender}, {time}
            </div>
        </div>
    );
}

export default QuoteBubble;
