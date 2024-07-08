import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../stores/userStore";

function SendButtonSvg() {
	const { t } = useTranslation();
	const thisClientColor = useUserStore((state) => state.myColor);
	const [strokeColor, setStrokeColor] = useState("#292D32");

	return (
		<>
			<svg
				onMouseLeave={() => setStrokeColor("#292D32")}
				onMouseEnter={() => setStrokeColor(thisClientColor)}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				width="2em"
				height="2em"
			>
				<title>{t("title_svg_send_button")}</title>
				<g
					className="transition duration-300 ease-in-out"
					style={{ stroke: strokeColor }}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m7.4 6.32 8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92Z" />
					<path d="m10.11 13.65 3.58-3.59" opacity={0.34} />
				</g>
			</svg>
		</>
	);
}

export { SendButtonSvg };
