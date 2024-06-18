import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEmergencyStore } from "../../../../stores/emergencyStore";
import { useUserStore } from "../../../../stores/userStore";

type EmergencyTriggerDivProps = {
	children: React.ReactNode;
};
function EmergencyTriggerDiv(props: EmergencyTriggerDivProps) {
	const { t } = useTranslation();
	const [emergencyValidationVisible, setEmergencyValidationVisible] =
		useState(false);
	const emergency = useEmergencyStore((state) => state.emergency);
	return (
		<>
			<div
				className={`relative cursor-pointer  ${emergency && "animate-pulse"}`}
				onClick={() => {
					if (useEmergencyStore.getState().emergency) {
						useEmergencyStore.getState().setChatVisible(true);
						return null;
					}
					setEmergencyValidationVisible(!emergencyValidationVisible);
				}}>
				{props.children}
				{emergencyValidationVisible && (
					<div className="fixed left-1/2 top-[5rem] z-50 -translate-x-1/2 overflow-hidden shadow-lg shadow-black/50 transition duration-300 ease-in-out">
						<div className="size-full items-center justify-center gap-3 rounded-md border border-black bg-white p-2 text-white">
							<div className="text-nowrap p-2 text-black">
								{t("emergency_validation_text")}
							</div>
							<div className="m-2 flex gap-5">
								<button
									type="button"
									className="w-full cursor-pointer rounded-full border border-b-4 border-gray-600/50 bg-green-300 p-1 text-center text-lg font-semibold text-gray-800 hover:bg-green-300/50"
									onClick={() => {
										setEmergencyValidationVisible(
											!emergencyValidationVisible,
										);
										useEmergencyStore
											.getState()
											.setEmergency(true);
										useEmergencyStore
											.getState()
											.setChatVisible(true);
										useEmergencyStore
											.getState()
											.setEmergencyInitiatorId(
												useUserStore.getState().myId,
											);
									}}>
									{t("emergency_validation_button_start")}
								</button>
								<button
									type="button"
									className="w-full cursor-pointer rounded-full border border-b-4 border-gray-600/50 bg-gray-300/50 p-1 text-center text-lg font-semibold text-gray-800 hover:bg-gray-100/50"
									onClick={() => {
										setEmergencyValidationVisible(
											!emergencyValidationVisible,
										);
									}}>
									{t("profile_menu_cancel_button")}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export { EmergencyTriggerDiv };
