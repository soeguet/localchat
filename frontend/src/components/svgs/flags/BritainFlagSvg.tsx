import { useTranslation } from "react-i18next";
import { svgSize } from "../../../utils/variables";

function BritainFlagSvg() {
	const { t } = useTranslation();
	return (
		<svg
			style={svgSize}
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			data-testid="britain-flag-svg"
			viewBox="-51.2 -51.2 614.40 614.40"
			fill="#000000">
			<title>{t("title_svg_english_flag")}</title>
			<g id="SVGRepo_bgCarrier" strokeWidth="0">
				<rect
					x="-51.2"
					y="-51.2"
					width="614.40"
					height="614.40"
					rx="307.2"
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
				<path
					style={{ fill: "#41479B" }}
					d="M473.655,88.276H38.345C17.167,88.276,0,105.443,0,126.621V385.38 c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.621 C512,105.443,494.833,88.276,473.655,88.276z"
				/>
				<path
					style={{ fill: "#F5F5F5" }}
					d="M511.469,120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54,107.147V88.276h-88.276 v107.147L48.322,88.276h-9.977c-19.017,0-34.792,13.847-37.814,32.007l139.778,91.58H0v88.276h140.309L0.531,391.717 c3.022,18.159,18.797,32.007,37.814,32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54,107.147h9.977 c19.017,0,34.792-13.847,37.814-32.007l-139.778-91.58H512v-88.276H371.691L511.469,120.282z"
				/>
				<g>
					<polygon
						style={{ fill: "#FF4B55" }}
						points="282.483,88.276 229.517,88.276 229.517,229.517 0,229.517 0,282.483 229.517,282.483 229.517,423.724 282.483,423.724 282.483,282.483 512,282.483 512,229.517 282.483,229.517 "
					/>
					<path
						style={{ fill: "#FF4B55" }}
						d="M24.793,421.252l186.583-121.114h-32.428L9.224,410.31 C13.377,415.157,18.714,418.955,24.793,421.252z"
					/>
					<path
						style={{ fill: "#FF4B55" }}
						d="M346.388,300.138H313.96l180.716,117.305c5.057-3.321,9.277-7.807,12.287-13.075L346.388,300.138z"
					/>
					<path
						style={{ fill: "#FF4B55" }}
						d="M4.049,109.475l157.73,102.387h32.428L15.475,95.842C10.676,99.414,6.749,104.084,4.049,109.475z"
					/>
					<path
						style={{ fill: "#FF4B55" }}
						d="M332.566,211.862l170.035-110.375c-4.199-4.831-9.578-8.607-15.699-10.86L300.138,211.862H332.566z"
					/>
				</g>
			</g>
		</svg>
	);
}

export { BritainFlagSvg };

