import useReplyStore from "../stores/replyStore";

function Reply() {
    const replyMessage = useReplyStore((state) => state.replyMessage);
    const setReplyMessage = useReplyStore((state) => state.setReplyMessage);

    return (
        <>
            {replyMessage && (
                <div className="flex items-center justify-between rounded-md bg-gray-100 p-2">
                    <div className="flex flex-1 flex-col">
                        <div className="flex items-center">
                            <p className="pr-2 text-xs text-gray-600">{replyMessage.time} -</p>
                            <p className="text-sm font-semibold text-gray-800">{replyMessage.username}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-800">{replyMessage.message}</p>
                    </div>
                    <button className="ml-4 text-gray-500 hover:text-gray-700" onClick={() => setReplyMessage(null)}>
                        <i className="fas fa-times">✖</i>
                    </button>
                </div>
            )}
        </>
    );
}

export default Reply;