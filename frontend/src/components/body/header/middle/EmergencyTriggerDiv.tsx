import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEmergencyStore } from "../../../../stores/emergencyStore";

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
					console.log("clicked");
					setEmergencyValidationVisible(!emergencyValidationVisible);
				}}>
				{props.children}
				{emergencyValidationVisible && (
					<div className="fixed overflow-hidden top-[5rem] shadow-black/50 shadow-lg left-1/2 -translate-x-1/2 z-50 transition duration-300 ease-in-out">
						<div className="gap-3 size-full items-center justify-center rounded-md border border-black bg-white p-2 text-white">
							<div className="text-black text-nowrap p-2">
								{t("emergency_validation_text")}
							</div>
							<div className="flex gap-5 m-2">
								<div
									className="text-lg rounded-full bg-green-300/50 text-center border-gray-600 font-semibold border p-1 w-full text-gray-800 cursor-pointer"
									onClick={() => {
										setEmergencyValidationVisible(
											!emergencyValidationVisible,
										);
										useEmergencyStore
											.getState()
											.setEmergency(true);
									}}>
									{t("emergency_validation_button_start")}
								</div>
								<div
									className="text-lg rounded-full bg-gray-300/50 text-center border-gray-600 font-semibold border p-1 w-full text-gray-800 cursor-pointer"
									onClick={() => {
										setEmergencyValidationVisible(
											!emergencyValidationVisible,
										);
									}}>
									{t("profile_menu_cancel_button")}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export { EmergencyTriggerDiv };
