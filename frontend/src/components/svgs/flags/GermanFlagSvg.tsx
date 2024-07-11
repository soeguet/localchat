import { useTranslation } from "react-i18next";

function GermanFlagSvg() {
	const { t } = useTranslation();
	return (
		<svg
			data-testid="german-flag-svg"
			width="2.1em"
			height="2.1em"
			viewBox="-3.6 -3.6 43.20 43.20"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			role="img"
			className="iconify iconify--twemoji"
			preserveAspectRatio="xMidYMid meet"
			fill="#000000"
		>
			<title>{t("title_svg_germany_flag")}</title>
			<g id="SVGRepo_bgCarrier" strokeWidth="0">
				<rect
					x="-3.6"
					y="-3.6"
					width="43.20"
					height="43.20"
					rx="21.6"
					fill="#ffffff"
					strokeWidth="0"
				/>
			</g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<g id="SVGRepo_iconCarrier">
				<path fill="#FFCD05" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z" />
				<path fill="#ED1F24" d="M0 14h36v9H0z" />
				<path fill="#141414" d="M32 5H4a4 4 0 0 0-4 4v5h36V9a4 4 0 0 0-4-4z" />
			</g>
		</svg>
	);
}

export { GermanFlagSvg };
