import { useTranslation } from "react-i18next";
import { svgSize } from "../../../utils/variables/variables";

function DisconnectedSvg() {
	const { t } = useTranslation();
	return (
		<svg
			data-testid="disconnected-svg"
			style={svgSize}
			viewBox="-1.4 -1.4 16.80 16.80"
			xmlns="http://www.w3.org/2000/svg"
			fill="#ff0000"
			stroke="#ff0000"
		>
			<title>{t("title_svg_disconnected")}</title>
			<g id="SVGRepo_bgCarrier" strokeWidth="0">
				<rect
					x="-1.4"
					y="-1.4"
					width="16.80"
					height="16.80"
					rx="8.4"
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
				<g fillRule="evenodd">
					<path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z" />
					<path
						d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z"
						fill="#FFF"
						style={{ fill: "var(--svg-status-bg, #fff)" }}
					/>
					<path d="M7 5.969L5.599 4.568a.29.29 0 0 0-.413.004l-.614.614a.294.294 0 0 0-.004.413L5.968 7l-1.4 1.401a.29.29 0 0 0 .004.413l.614.614c.113.114.3.117.413.004L7 8.032l1.401 1.4a.29.29 0 0 0 .413-.004l.614-.614a.294.294 0 0 0 .004-.413L8.032 7l1.4-1.401a.29.29 0 0 0-.004-.413l-.614-.614a.294.294 0 0 0-.413-.004L7 5.968z" />
				</g>
			</g>
		</svg>
	);
}

export { DisconnectedSvg };