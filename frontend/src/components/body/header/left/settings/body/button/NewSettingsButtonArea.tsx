type NewSettingsButtonAreaProps = {
    onClose: () => void;
};

function NewSettingsButtonArea(props: NewSettingsButtonAreaProps) {
    return (
        <>
            <div
                data-testid="settings-button-area"
                className="col-span-2 flex items-center justify-end"
            >
                <button
                    data-testid="save-settings-modal-button"
                    onClick={props.onClose}
                    className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
                >
                    SAVE
                </button>
                <button
                    data-testid="close-settings-modal-button"
                    onClick={props.onClose}
                    className="ml-2 mt-2 rounded-lg bg-gray-500 px-4 py-2 text-white"
                >
                    CANCEL
                </button>
            </div>
        </>
    );
}

export { NewSettingsButtonArea };
