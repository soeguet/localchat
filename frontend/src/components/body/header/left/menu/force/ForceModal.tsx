import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../../../../stores/clientStore";
import { useUserStore } from "../../../../../../stores/userStore";
import { useWebsocketStore } from "../../../../../../stores/websocketStore";
import { PayloadSubTypeEnum } from "../../../../../../utils/types/customTypes";
import { ForceIconSvg } from "../../../../../svgs/icons/ForceIconSvg";
import { CloseButton } from "../../../../../svgs/ui/CloseButton";

function ForceModal() {
	// state ref
	const { t } = useTranslation();
	const clientsList = useClientStore((state) => state.clientMap);
	const websocket = useWebsocketStore((state) => state.ws);
	const thisClientId = useUserStore((state) => state.myId);
	const thisClientColor = useUserStore((state) => state.myColor);

	const [hover, setHover] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const forceModalRef = useRef<HTMLDialogElement>(null);
	// state ref

	useEffect(() => {
		if (!forceModalRef.current) {
			return;
		}

		if (isOpen) {
			forceModalRef.current.showModal();
			document.addEventListener("mousedown", handleClickOutside);
		} else if (forceModalRef.current.open) {
			forceModalRef.current.close();
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	if (clientsList.size === 0) {
		return null;
	}

	const forceClient = (clientDbId: string) => {
		if (websocket !== null) {
			websocket.send(
				JSON.stringify({
					payloadType: PayloadSubTypeEnum.enum.force,
					clientDbId: clientDbId,
				}),
			);
		}
	};

	/**
	 * Handles the click outside the modal.
	 * @param event - The mouse event object.
	 */
	const handleClickOutside = (event: MouseEvent) => {
		if (!forceModalRef.current) {
			return;
		}

		if (!forceModalRef.current.contains(event.target as Node)) {
			const { left, top, right, bottom } =
				forceModalRef.current.getBoundingClientRect();
			const { clientX, clientY } = event;

			if (
				clientX < left ||
				clientX > right ||
				clientY < top ||
				clientY > bottom
			) {
				setIsOpen(false);
			}
		}
	};

	return (
		<>
			<button
				type="button"
				className="group flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
				onClick={() => {
					setIsOpen(!isOpen);
				}}>
				<div className="group-hover:animate-bounce">
					<ForceIconSvg />
				</div>
				{t("menu_item_force")}
			</button>
			{isOpen && (
				<dialog
					ref={forceModalRef}
					className="myTransition size-2/3 rounded-lg border-2 border-transparent p-4 text-black backdrop:bg-black backdrop:bg-opacity-70"
					style={{
						borderColor: hover ? thisClientColor : "",
					}}>
					<div
						className="size-full relative overflow-auto border-2 p-4"
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}>
						<div
							className="absolute right-3 top-0.5 cursor-pointer transition duration-300 ease-in-out hover:animate-spin"
							onClick={() => setIsOpen(false)}
							onKeyDown={() => setIsOpen(false)}>
							<CloseButton
								title="close"
								titleId="close-force-modal-button"
							/>
						</div>
						<table className="min-w-full divide-y divide-gray-500">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900">
										username
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left font-semibold text-gray-900">
										action
									</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{Array.from(clientsList).map(([_, client]) => {
									if (client.clientDbId === thisClientId)
										return;
									return (
										<tr
											key={client.clientDbId}
											className="group/force-name myTransition border border-transparent even:bg-gray-200 hover:border-gray-200 hover:bg-gray-100">
											<td
												className={`myTransition group-hover/force-name:text- whitespace-nowrap py-4 pl-4 pr-3 text-gray-900${thisClientColor ? thisClientColor : "sky"}-400`}>
												{client.clientUsername}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-3">
												<button
													type="button"
													className="flex items-center gap-2 rounded bg-blue-500 px-5 py-2 text-sm text-white hover:bg-blue-700"
													onClick={() =>
														forceClient(
															client.clientDbId,
														)
													}>
													<ForceIconSvg />
													{t("menu_item_force")}
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</dialog>
			)}
		</>
	);
}

export { ForceModal };