import { useTranslation } from "react-i18next";

type PreferPictureUrlCheckboxProps = {
	isSelected: (checked: boolean) => void;
};

function PreferPictureUrlCheckbox(props: PreferPictureUrlCheckboxProps) {
	const { t } = useTranslation();
	return (
		<>
			<div data-testid="settings-prefer-picture-url">
				<label htmlFor="profilePicture">{t("profile_modal_title")}</label>
				<div className="flex h-6 items-center">
					<input
						id="comments"
						aria-describedby="comments-description"
						onChange={(e) => props.isSelected(e.target.checked.valueOf())}
						name="comments"
						type="checkbox"
						className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
					/>
					<label htmlFor="comments" className="ml-3 font-medium text-gray-500">
						{t("prefer_pic_url")}
					</label>
				</div>
			</div>
		</>
	);
}

export { PreferPictureUrlCheckbox };
