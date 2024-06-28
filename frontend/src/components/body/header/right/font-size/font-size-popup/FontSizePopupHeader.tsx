import { useTranslation } from "react-i18next";

type FontSizePopupHeaderProps = {
	fontSize: number;
};
function FontSizePopupHeader(props: FontSizePopupHeaderProps) {
	const { t } = useTranslation();
	return (
		<>
			<div>
				<span className="text-gray-400 text-sm">
					{t("font_size_preview_label")}
				</span>
				<div className="flex h-20 w-[21rem] text-black items-center justify-between border border-gray-400 p-3 shadow shadow-black/50">
					<h2>
						{t("adjust_font_size")} - {props.fontSize}
					</h2>
				</div>
			</div>
		</>
	);
}

export { FontSizePopupHeader };
