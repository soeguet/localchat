import { useUserStore } from "../../../../../stores/userStore";
import type { MessagePayload } from "../../../../../utils/customTypes";

type ReactionFieldProps = {
    messagePayload: MessagePayload;
};

function ReactionField(props: ReactionFieldProps) {
    const side =
        useUserStore.getState().myId ===
        props.messagePayload.clientType.clientDbId
            ? "right-0"
            : "left-0";

    return (
        <div className={`absolute ${side}`}>
            <div className="flex translate-y-1 cursor-pointer select-none whitespace-nowrap rounded-full border-2 bg-white p-1 text-center text-sm text-gray-600">
                {[
                    ...new Set(
                        props.messagePayload.reactionType?.map(
                            (reaction) => reaction.reactionContext
                        )
                    ),
                ].map((reactionContext, index) => {
                    if (index > 3) return null;
                    return (
                        <div
                            className="mr-1 hover:animate-spin"
                            key={reactionContext}
                        >
                            {reactionContext}
                        </div>
                    );
                })}
                <span className="px-2">
                    {props.messagePayload.reactionType?.length}
                </span>
            </div>
        </div>
    );
}

export { ReactionField };
