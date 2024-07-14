import { useTranslation } from "react-i18next";

function BannerHideSvg() {
	const { t } = useTranslation();
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				width="2em"
				height="2em">
				<title>{t("title_svg_hide_banner")}</title>
				<path
					fill="#222"
					fillRule="evenodd"
					d="M15.92 12.799a4 4 0 0 0-4.719-4.719l4.72 4.719ZM8.667 9.788a4 4 0 0 0 5.545 5.545L8.667 9.788Z"
					clipRule="evenodd"
				/>
				<path
					fill="#2A4157"
					fillOpacity={0.24}
					fillRule="evenodd"
					d="m15.787 16.909-8.929-8.93c-1.314.986-2.373 2.138-3.046 2.955-.388.472-.582.707-.582 1.066 0 .359.194.594.582 1.066C5.232 14.79 8.364 18 12 18c1.353 0 2.636-.445 3.787-1.091ZM9.577 6.456A6.988 6.988 0 0 1 12 6c3.636 0 6.768 3.21 8.188 4.934.388.472.582.707.582 1.066 0 .359-.194.594-.582 1.066a19.456 19.456 0 0 1-1.95 2.05l-8.661-8.66Z"
					clipRule="evenodd"
				/>
				<path
					fill="#222"
					fillRule="evenodd"
					d="M15.92 12.799a4 4 0 0 0-4.719-4.719l4.72 4.719ZM8.667 9.788a4 4 0 0 0 5.545 5.545L8.667 9.788Z"
					clipRule="evenodd"
				/>
				<path stroke="#222" strokeWidth={1.2} d="m8 5 12 12" />
			</svg>
		</>
	);
}

export { BannerHideSvg };
