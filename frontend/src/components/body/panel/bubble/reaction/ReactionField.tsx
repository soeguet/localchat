import {ReactionEntity} from "../../../../../utils/customTypes";

type ReactionFieldProps = {
    reactionType: Omit<ReactionEntity, "reactionDbId">[];
};

function ReactionField(props:ReactionFieldProps) {

    return (
        <div className="absolute right-0">
            <div
                className="text-xs text-gray-600 cursor-pointer select-none whitespace-nowrap rounded-full p-1 translate-y-1 bg-white border-2 text-center">
                {props.reactionType?.map((reaction) => {
                    return (
                        <span
                            key={reaction.reactionContext}
                            className="mr-1"
                        >
                                        {reaction.reactionContext}
                        </span>
                    );
                })}
                <span className="px-2">{props.reactionType?.length}</span>
            </div>
        </div>
    );
}

export default ReactionField;