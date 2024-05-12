import { useEffect, useRef } from "react";
import { NewSettingsModalContainer } from "./NewSettingsModalContainer";

type NewSettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

function NewSettingsModal(props: NewSettingsModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef == null || dialogRef.current === null) {
            return;
        }
        if (props.isOpen) {
            dialogRef.current.showModal();
        } else if (dialogRef.current.open) {
            dialogRef.current.close();
        }
    }, [props.isOpen]);

    return (
        <>
            <dialog
                data-testid="settings-modal"
                className="z-10 size-3/4 bg-transparent "
                ref={dialogRef}
            >
                <NewSettingsModalContainer onClose={props.onClose} />
            </dialog>
        </>
    );
}

export { NewSettingsModal };
