import { useTranslation } from "react-i18next";

function BannerUnhideSvg() {
	const { t } = useTranslation();
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				width="2em"
				height="2em">
				<title>{t("title_svg_unhide_banner")}</title>
				<path
					fill="#2A4157"
					fillOpacity={0.24}
					fillRule="evenodd"
					d="M2.455 11.116C3.531 9.234 6.555 5 12 5c5.444 0 8.469 4.234 9.544 6.116.221.386.331.58.32.868-.013.288-.143.476-.402.852C20.182 14.693 16.706 19 12 19c-4.706 0-8.182-4.306-9.462-6.164-.26-.376-.39-.564-.401-.852-.013-.288.098-.482.318-.868ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
					clipRule="evenodd"
				/>
				<path
					stroke="#222"
					strokeWidth={1.2}
					d="M12 5c-5.444 0-8.469 4.234-9.544 6.116-.221.386-.331.58-.32.868.013.288.143.476.402.852C3.818 14.693 7.294 19 12 19c4.706 0 8.182-4.306 9.462-6.164.26-.376.39-.564.401-.852.012-.288-.098-.482-.319-.868C20.47 9.234 17.444 5 12 5Z"
				/>
				<circle cx={12} cy={12} r={3} stroke="#222" strokeWidth={1.2} />
			</svg>
		</>
	);
}

export { BannerUnhideSvg };
