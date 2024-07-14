import { useTranslation } from "react-i18next";

function BannerDeleteConfirmSvg() {
	const { t } = useTranslation();
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				viewBox="0 0 512 512"
				width="2em"
				height="2em">
				<title>{t("title_svg_banner_delete_confirm")}</title>
				<path
					d="M255.832 32.021c123.697.096 223.907 100.45 223.811 224.147s-100.45 223.907-224.147 223.811C131.863 479.883 31.685 379.633 31.685 256c.184-123.689 100.458-223.883 224.147-223.979m0-32.021C114.443.096-.096 114.779 0 256.168S114.779 512.096 256.168 512C397.485 511.904 512 397.317 512 256 511.952 114.571 397.261-.048 255.832 0z"
					style={{
						fill: "#ccc",
					}}
				/>
				<path
					d="M227.863 113.103h56.028V398.96h-56.028z"
					style={{
						fill: "#e21b1b",
					}}
					transform="rotate(-45.001 255.876 256.036)"
				/>
				<path
					d="M112.943 227.962H398.8v56.028H112.943z"
					style={{
						fill: "#e21b1b",
					}}
					transform="rotate(-45.001 255.87 255.98)"
				/>
			</svg>
		</>
	);
}

export { BannerDeleteConfirmSvg };
