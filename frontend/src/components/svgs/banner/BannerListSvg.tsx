import { useState } from "react";
import { useTranslation } from "react-i18next";

type BannerListSvgProps = {
	number?: number;
	backgroundColor?: string;
	accentColor?: string;
};

function BannerListSvg(props: BannerListSvgProps) {
	const { t } = useTranslation();
	const [hover, setHover] = useState(false);
	let count: number = props.number || 0;

	if (count > 9) {
		count = 9;
	}

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				width="1.5em"
				height="1.5em">
				<title>{t("title_svg_banner_list")}</title>
				<circle
					className={
						"animate-pulse transition duration-300 ease-in-out"
					}
					cx="50"
					cy="50"
					r="50"
					fill={hover ? props.accentColor : props.backgroundColor}
				/>
				<text
					x="50"
					y="70"
					fontFamily="Arial, sans-serif"
					fontSize="4rem"
					fontWeight="bold"
					textAnchor="middle"
					fill="white">
					{count}
				</text>
			</svg>
		</>
	);
}

export { BannerListSvg };
