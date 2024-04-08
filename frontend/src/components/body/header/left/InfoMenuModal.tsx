import {ReactNode, useEffect, useRef} from "react";

type InfoMenuModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const InfoMenuModal = ({isOpen, onClose, children}: InfoMenuModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {

        if (dialogRef == null || dialogRef.current === null) {
            return;
        }
        if (isOpen) {
            dialogRef.current.showModal();
        } else if (dialogRef.current.open) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} onClose={onClose}>
            {children}
            <button onClick={onClose}>Close</button>
        </dialog>
    );
};

export {InfoMenuModal};