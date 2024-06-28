import { useEffect, useRef } from "react";
import { NewSettingsModalContainer } from "./NewSettingsModalContainer";

type NewSettingsModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSave: () => void;
};

/**
 * Renders a modal component for displaying settings.
 *
 * @param {NewSettingsModalProps} props - The component props.
 * @returns {JSX.Element} The rendered modal component.
 */
function NewSettingsModal(props: NewSettingsModalProps): JSX.Element {
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
		<div className="w-full">
			<dialog
				data-testid="settings-modal"
				className="fixed inset-0 z-10 bg-transparent backdrop:bg-black backdrop:opacity-70"
				ref={dialogRef}>
				<NewSettingsModalContainer
					onSave={props.onSave}
					onClose={props.onClose}
				/>
			</dialog>
		</div>
	);
}

export { NewSettingsModal };
