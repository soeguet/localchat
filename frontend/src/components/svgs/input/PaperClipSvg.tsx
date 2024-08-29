import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../stores/userStore";
import { useState } from "react";
import {DEFAULT_HOVER_COLOR, DEFAULT_STROKE_COLOR} from "../../../utils/variables/variables";

function PaperClipSvg() {
	const { t } = useTranslation();
	const thisClientColor = useUserStore((state) => state.myColor);
	const [strokeColor, setStrokeColor] = useState<string>(DEFAULT_STROKE_COLOR);

	const hoverColor = thisClientColor ? thisClientColor : DEFAULT_HOVER_COLOR;

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				onMouseLeave={() => setStrokeColor(DEFAULT_STROKE_COLOR)}
				onMouseEnter={() => setStrokeColor(hoverColor)}
				viewBox="0 0 24 24"
				width="2em"
				height="2em"
			>
				<title>{t("title_svg_paper_clip")}</title>
				{/* <g fill="#1C274C"> */}
				<g
					className="transition duration-300 ease-in-out"
					style={{ fill: strokeColor }}
				>
					<path
						fillRule="evenodd"
						d="M11.244 1.955c1.7-.94 3.79-.94 5.49 0 .63.348 1.218.91 2.172 1.825l.094.09a.75.75 0 1 1-1.037 1.083c-1.079-1.032-1.518-1.444-1.954-1.685a4.198 4.198 0 0 0-4.04 0c-.436.24-.875.653-1.953 1.685l-5.99 5.735A.75.75 0 0 1 2.99 9.605L8.98 3.87l.093-.09c.955-.914 1.543-1.477 2.172-1.825Zm3.701 4.805a.75.75 0 0 1 1.06-.023l.081.078c.367.35.683.651.86 1.003a2.213 2.213 0 0 1 0 1.994c-.177.352-.493.653-.86 1.004l-.08.077-7.38 7.066a.75.75 0 0 1-1.038-1.083l7.38-7.067c.495-.473.594-.583.638-.671a.712.712 0 0 0 0-.646c-.044-.088-.143-.198-.638-.671a.75.75 0 0 1-.023-1.06Z"
						clipRule="evenodd"
					/>
					<path
						d="M17.963 4.954c1.08 1.034 1.507 1.452 1.756 1.865a3.645 3.645 0 0 1 0 3.788c-.249.413-.676.831-1.756 1.866l-7.434 7.117c-.558.535-.944.903-1.268 1.164-.316.255-.523.365-.707.418a2.01 2.01 0 0 1-1.108 0c-.184-.053-.391-.163-.707-.418-.324-.261-.71-.63-1.269-1.164-.558-.535-.943-.904-1.215-1.214-.267-.303-.376-.495-.428-.659a1.681 1.681 0 0 1 0-1.009c.052-.163.16-.355.428-.658.272-.31.657-.679 1.215-1.214l7.327-7.015c.492-.471.61-.57.71-.616a.902.902 0 0 1 .75 0c.101.046.22.145.711.616a.75.75 0 0 1 1.02-1.1l-.06-.058c-.37-.355-.682-.654-1.042-.82a2.402 2.402 0 0 0-2.007 0c-.36.166-.672.465-1.041.82l-7.429 7.113c-.529.506-.96.92-1.28 1.283-.33.376-.592.752-.733 1.2a3.181 3.181 0 0 0 0 1.907c.14.449.402.825.733 1.2.32.365.751.778 1.28 1.284l.048.046c.529.507.96.92 1.34 1.226.393.317.78.561 1.234.692a3.51 3.51 0 0 0 1.937 0c.455-.13.842-.375 1.235-.692.38-.306.81-.72 1.34-1.226l7.555-7.234c.95-.91 1.54-1.474 1.906-2.08a5.144 5.144 0 0 0 0-5.337c-.366-.607-.955-1.171-1.906-2.081l-.08-.077a.75.75 0 0 1-1.055 1.067Z"
						opacity={0.5}
					/>
				</g>
			</svg>
		</>
	);
}

export { PaperClipSvg };