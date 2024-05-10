import { NewSettingsButtonArea } from "./settings/NewSettingsButtonArea";

type NewSettingsModalProps = {
    onClose: () => void;
};
function NewSettingsModalContainer(props: NewSettingsModalProps) {
    return (
        <>
            <div
                className=" flex size-full flex-col rounded-xl border-2 border-black bg-white p-3"
                data-testid="settings-modal-container"
            >
                <div className="grow border bg-red-50"></div>
                <NewSettingsButtonArea onClose={props.onClose} />
            </div>
        </>
    );
}

export { NewSettingsModalContainer };
