type DeletedMessageProps = {
    thisMessageFromThisClient: boolean;
};
function DeletedMessage(props: DeletedMessageProps) {
    const messageOnWhichSideAligned = `${props.thisMessageFromThisClient ? "justify-end pr-4" : "pl-4"
        }`;
    return (
        <>
            <div
                className={`${messageOnWhichSideAligned} flex py-3 mx-5 text-red-800`}>
                <div>deleted message</div>
            </div>
        </>
    );
}

export { DeletedMessage };
