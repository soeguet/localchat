import { type ReactNode, useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../../stores/userStore";
import { CloseButton } from "../../../svgs/ui/CloseButton";
import { useEmergencyStore } from "../../../../stores/emergencyStore";

type InfoMenuModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

const InfoMenuModal = (props: InfoMenuModalProps) => {
	const [hover, setHover] = useState(false);
	const clientColor: string = useUserStore.getState().myColor;
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
		<dialog
			data-testid="info-menu-modal"
			className="myTransition size-1/4 flex flex-col rounded-xl border-2 border-transparent shadow-lg backdrop:bg-black backdrop:bg-opacity-70"
			style={{
				borderColor: hover ? clientColor : "",
			}}
			ref={dialogRef}
			onClose={props.onClose}
		>
			<div
				onMouseOver={() => setHover(true)}
				onFocus={() => setHover(true)}
				onMouseOut={() => setHover(false)}
				onBlur={() => setHover(false)}
				className="size-full relative flex flex-col rounded-xl p-3"
			>
				<div
					className="myTransition absolute right-1 top-1 cursor-pointer select-none text-center hover:animate-spin"
					onClick={props.onClose}
					onKeyDown={props.onClose}
				>
					<CloseButton title="close" titleId="close-info-menu-button" />
				</div>
				<div className="h-full">{props.children}</div>
			</div>
		</dialog>
	);
};

export { InfoMenuModal };
