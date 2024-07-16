import { useTranslation } from "react-i18next";

function BannerDeleteSvg() {
	const { t } = useTranslation();
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				width="2em"
				height="2em">
				<title>{t("title_svg_delete_banner")}</title>
				<path
					fill="#2A4157"
					fillOpacity={0.24}
					d="M4 7.5c0-.236 0-.354.073-.427C4.146 7 4.264 7 4.5 7h15c.236 0 .354 0 .427.073.073.073.073.191.073.427v.252c0 .09 0 .136-.014.176a.25.25 0 0 1-.057.092c-.03.03-.07.05-.151.091-.651.325-.976.488-1.213.732a2 2 0 0 0-.453.733C18 9.896 18 10.26 18 10.988V16c0 1.886 0 2.828-.586 3.414C16.828 20 15.886 20 14 20h-4c-1.886 0-2.828 0-3.414-.586C6 18.828 6 17.886 6 16v-5.012c0-.728 0-1.092-.112-1.412a2 2 0 0 0-.453-.733c-.237-.244-.562-.407-1.213-.732a.559.559 0 0 1-.151-.091.25.25 0 0 1-.057-.092C4 7.888 4 7.842 4 7.752V7.5Z"
				/>
				<path
					stroke="#222"
					strokeLinecap="round"
					d="M10.068 4.37c.114-.106.365-.2.715-.267A6.68 6.68 0 0 1 12 4c.44 0 .868.036 1.217.103.35.067.6.161.715.268"
				/>
				<rect width={1} height={6} x={14} y={11} fill="#222" rx={0.5} />
				<rect width={1} height={6} x={9} y={11} fill="#222" rx={0.5} />
			</svg>
		</>
	);
}

export { BannerDeleteSvg };
