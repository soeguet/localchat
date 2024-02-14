import { useEffect } from "react";
import useReplyStore, { type ReplyStore } from "../stores/replyStore";

function Reply() {
    const replyStore: ReplyStore = useReplyStore();

    useEffect(() => {
        if (replyStore.replyTo) {
            console.log(replyStore.replyTo);
        }
    }, [replyStore.replyTo]);

    return (
        <>
            {replyStore.replyTo && (
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">


                    <div className="flex flex-1 flex-col">
                        <div className="flex items-center">
                            <p className="text-xs text-gray-600 pr-2">{replyStore.replyTo.time} -</p>
                            <p className="text-sm font-semibold text-gray-800">{replyStore.replyTo.username}</p>
                        </div>
                        <p className="text-sm text-gray-800 mt-1">{replyStore.replyTo.message}</p>
                    </div>
                    <button
                        className="ml-4 text-gray-500 hover:text-gray-700"
                        onClick={() => replyStore.setReplyTo(null)}
                    >
                        <i className="fas fa-times">✖</i>
                    </button>
                </div>
            )}
        </>
    );
}

export default Reply;
