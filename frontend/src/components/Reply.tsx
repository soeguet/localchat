import { useEffect } from "react";
import useReplyStore from "../stores/replyStore";

function Reply() {
    const { replyTo, setReplyTo } = useReplyStore();

    useEffect(() => {
        if (replyTo) {
            console.log(replyTo);
        }
    }, [replyTo]);

    return (
        <>
            {replyTo && (
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <div className="flex flex-1 flex-col">
                        <div className="flex items-center">
                            <p className="text-xs text-gray-600 pr-2">{replyTo.time} -</p>
                            <p className="text-sm font-semibold text-gray-800">{replyTo.username}</p>
                        </div>
                        <p className="text-sm text-gray-800 mt-1">{replyTo.message}</p>
                    </div>
                    <button className="ml-4 text-gray-500 hover:text-gray-700" onClick={() => setReplyTo(null)}>
                        <i className="fas fa-times">✖</i>
                    </button>
                </div>
            )}
        </>
    );
}

export default Reply;
