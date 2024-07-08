import { useTranslation } from "react-i18next";

function MenuDotsSvg() {
	const { t } = useTranslation();
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				width="2em"
				height="2em"
			>
				<title>{t("emergency_chat_header_dots_menu")}</title>
				<g stroke="#fff" strokeWidth={1.5}>
					<path strokeLinecap="round" d="M5 14a2 2 0 1 0-2-2" />
					<circle cx={12} cy={12} r={2} />
					<path strokeLinecap="round" d="M21 12a2 2 0 1 1-2-2" />
				</g>
			</svg>
		</>
	);
}

export { MenuDotsSvg };
