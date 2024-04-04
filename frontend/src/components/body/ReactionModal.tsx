import EmojiPicker from "emoji-picker-react";
import useReactionMenuStore from "../../stores/reactionMenuStore";

function ReactionModal() {
    const isOpen = useReactionMenuStore((state) => state.isOpen);
    const position = useReactionMenuStore((state) => state.position);

    return (
        <>
            {isOpen && (
                <div
                    className="absolute "
                    style={{
                        top: position.y,
                        left: position.x,
                    }}
                >
                    <EmojiPicker reactionsDefaultOpen={true} />
                </div>
            )}
        </>
    );
}

export default ReactionModal;
