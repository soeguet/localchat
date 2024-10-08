import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../stores/userStore";
import {DEFAULT_HOVER_COLOR, DEFAULT_STROKE_COLOR} from "../../../utils/variables/variables";

function EmojiMenuSvg() {
	const { t } = useTranslation();
	const thisClientColor = useUserStore((state) => state.myColor);
	const [strokeColor, setStrokeColor] = useState<string>(DEFAULT_STROKE_COLOR);

	const hoverColor = thisClientColor ? thisClientColor : DEFAULT_HOVER_COLOR;
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				width="2em"
				height="2em"
				className="transition duration-300 ease-in-out"
				onMouseLeave={() => setStrokeColor(DEFAULT_STROKE_COLOR)}
				onMouseEnter={() => {
					setStrokeColor(hoverColor);
				}}
				viewBox="0 0 512 512"
				style={{ fill: strokeColor }}
			>
				<title>{t("title_svg_emoji_menu")}</title>
				<path d="M472.12 118.727c-25.389-39.892-61.21-71.958-103.591-92.729-4.962-2.435-10.957-.383-13.39 4.582-2.432 4.962-.382 10.957 4.582 13.39 39.074 19.151 72.102 48.718 95.514 85.504 24.042 37.776 36.75 81.528 36.75 126.526 0 130.124-105.862 235.985-235.985 235.985S20.015 386.122 20.015 256 125.876 20.015 256 20.015c5.527 0 10.007-4.481 10.007-10.007C266.007 4.481 261.527 0 256 0 114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256c0-48.813-13.79-96.28-39.88-137.273z" />
				<path d="M222.058 99.07c-44.543 0-80.785 36.24-80.785 80.785 0 44.545 36.24 80.785 80.785 80.785 44.545 0 80.785-36.24 80.785-80.785S266.602 99.07 222.058 99.07zm.001 141.555c-33.509 0-60.77-27.261-60.77-60.77s27.261-60.77 60.77-60.77 60.77 27.261 60.77 60.77c0 33.508-27.261 60.77-60.77 60.77zM393.43 125.281c-30.091 0-54.573 24.482-54.573 54.573s24.482 54.573 54.573 54.573 54.573-24.482 54.573-54.573-24.481-54.573-54.573-54.573zm0 89.134c-19.055 0-34.559-15.503-34.559-34.559s15.503-34.559 34.559-34.559c19.055 0 34.559 15.503 34.559 34.559 0 19.055-15.503 34.559-34.559 34.559zM315.066 317.897c-23.943 0-43.424 19.481-43.424 43.424 0 23.944 19.481 43.424 43.424 43.424 23.943 0 43.424-19.481 43.424-43.424s-19.481-43.424-43.424-43.424zm0 66.834c-12.907 0-23.409-10.502-23.409-23.409s10.502-23.409 23.409-23.409c12.908 0 23.409 10.502 23.409 23.409s-10.502 23.409-23.409 23.409z" />
				<circle cx={243.445} cy={179.852} r={10.007} />
				<circle cx={400.534} cy={179.852} r={10.007} />
				<circle cx={330.363} cy={21.536} r={10.007} />
			</svg>
		</>
	);
}

export { EmojiMenuSvg };