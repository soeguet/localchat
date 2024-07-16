import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddButton() {
	const { t } = useTranslation();
	const [hover, setHover] = useState(false);
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 48 48"
				width="1.7em"
				height="1.7em"
				className="transition duration-300 ease-in-out"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}>
				<title>{t("title_svg_add_banner_button")}</title>
				<g
					stroke={hover ? "#007020" : "#000"}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={4}>
					<path d="M16 6H8a2 2 0 0 0-2 2v8M16 42H8a2 2 0 0 1-2-2v-8M32 42h8a2 2 0 0 0 2-2v-8M32 6h8a2 2 0 0 1 2 2v8M32 24H16M24 32V16" />
				</g>
			</svg>
		</>
	);
}

export { AddButton };
