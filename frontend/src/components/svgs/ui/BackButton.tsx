import { useTranslation } from "react-i18next";

function BackButton() {
	const { t } = useTranslation();
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 48 48"
				width="1.5em"
				height="1.5em">
				<title>{t("title_svg_back_button")}</title>
				<path fill="#fff" fillOpacity={0.01} d="M0 0h48v48H0z" />
				<path
					fill="#aFa8FF"
					fillRule="evenodd"
					stroke="#000"
					strokeLinejoin="round"
					strokeWidth={4}
					d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168-3.797-.805-7.412-.927-10.846-.365V41L4 23.545 20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833 4.445 4.505 7.009 10.117 7.69 16.836Z"
					clipRule="evenodd"
				/>
			</svg>
		</>
	);
}

export { BackButton };
