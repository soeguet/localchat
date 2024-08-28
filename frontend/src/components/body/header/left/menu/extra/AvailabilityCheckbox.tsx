import useSettingsStore from "../../../../../../stores/settingsStore";
import { useTranslation } from "react-i18next";

function AvailabilityCheckbox() {
	const { t } = useTranslation();
	const availability = useSettingsStore((state) => state.availability);
	const setAvailability = useSettingsStore((state) => state.setAvailability);


	return (
		<>
			wo sitzt das bitte
			<div className="flex-row">
				<div>
					<label className="mr-4" htmlFor="availability">
						{t("settings_label_availability")}
					</label>
					<input
						checked={availability ?? false}
						type="checkbox"
						onChange={(e) => setAvailability(e.target.checked)}
						id="availability"
						name="availability"
					/>
				</div>
				{availability && (
					<div className="text-amber-500 text-sm max-w-96 text-wrap">
						{t("availability_warning")}
					</div>
				)}
			</div>
		</>
	);
}

export { AvailabilityCheckbox };