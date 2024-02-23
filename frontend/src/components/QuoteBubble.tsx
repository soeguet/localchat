type QuoteBubbleProps = {
    message: string;
    sender: string;
    time: string;
};

function QuoteBubble({ message, sender, time }: QuoteBubbleProps) {
    return (
        <div className="my-1 p-2 bg-gray-100 bg-opacity-70 rounded-md border-l-4 border-blue-300">
            <div className="text-sm text-gray-800">{message}</div>
            <div className="mt-2 text-xs text-gray-500">
                — {sender}, {time}
            </div>
        </div>
    );
}

export default QuoteBubble;
