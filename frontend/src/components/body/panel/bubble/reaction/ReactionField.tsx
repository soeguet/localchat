import useUserStore from "../../../../../stores/userStore";
import {MessagePayload} from "../../../../../utils/customTypes";

type ReactionFieldProps = {
    messagePayload: MessagePayload;
};

function ReactionField(props: ReactionFieldProps) {

    const side = (useUserStore.getState().myId === props.messagePayload.clientType.clientDbId) ? "right-0" : "left-0";

    return (
        <div className={`absolute ${side}`}>
            <div
                className="text-xs text-gray-600 cursor-pointer select-none whitespace-nowrap rounded-full p-1 translate-y-1 bg-white border-2 text-center">
                {[...new Set(props.messagePayload.reactionType?.map((reaction) => reaction.reactionContext))].map(
                    (reactionContext, index) => {
                        if (index > 3) return null;
                        return (
                            <span key={reactionContext + index} className="mr-1">
                                {reactionContext}
                            </span>
                        );
                    }
                )}
                <span className="px-2">{props.messagePayload.reactionType?.length}</span>
            </div>
        </div>
    );
}

export default ReactionField;