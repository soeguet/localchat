import { useTranslation } from "react-i18next";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import {useUserStore} from "../../../stores/userStore";
import {useState} from "react";
import {DEFAULT_HOVER_COLOR} from "../../../utils/variables/variables";

function AvailabilitySvg() {
	const { t } = useTranslation();
	const isEmergency = useEmergencyStore((state) => state.emergency);
	const thisClientColor = useUserStore((state) => state.myColor);
	const [hover, setHover] = useState(false);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			fill="#b11b1b"
			stroke="#b11b1b"
			strokeWidth={0}
			viewBox="-4.99 -4.99 43.24 43.24"
			className={`border-2 rounded-full ${isEmergency && "animate-pulse"}`}
			width="2.5em"
			height="2.5em"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				borderColor: hover ? thisClientColor : DEFAULT_HOVER_COLOR,
			}}
		>
			<title>{t("title_svg_availability")}</title>
			<rect
				width={43.24}
				height={43.24}
				x={-4.99}
				y={-4.99}
				fill="#fff"
				stroke="none"
				rx={21.62}
			/>
			<path
				stroke="none"
				d="M30.121 16.633c0 6.328-4.854 11.538-11.035 12.112a10.112 10.112 0 0 0-.221-.934 14.688 14.688 0 0 0-.613-1.665c5.117-.159 9.23-4.359 9.23-9.515s-4.113-9.354-9.23-9.515a14.78 14.78 0 0 0 .615-1.675c.094-.325.162-.63.219-.924 6.179.578 11.035 5.788 11.035 12.116zM3.496 9.364a114.585 114.585 0 0 0-.342 7.077h-.012c.002.063.006.127.006.19 0 .062-.004.127-.006.188h.012c.043 2.362.151 4.724.342 7.077.494 6.165 5.34 10.26 10.088 9.197.207-.042.426-.044.621-.125 1.156-.479 2.115-1.376 3.183-2.036 1.359-.854-1.573-8.095-3.392-7.159-.672.352-2.528 1.722-3.274 1.825-.665.093-1.188-.788-1.253-1.604-.175-2.149-.018-4.896-.003-7.177h.003l-.002-.188.002-.19h-.004c-.015-2.28-.172-5.026.003-7.176.065-.814.588-1.697 1.253-1.603.746.104 2.603 1.475 3.274 1.824 1.818.937 4.752-6.308 3.392-7.158C16.32 1.664 15.361.767 14.204.29c-.195-.081-.414-.084-.621-.125C8.835-.893 3.99 3.201 3.496 9.364zm8.771 9.948h4.237l.228-1.071h-2.703c.104-.128.222-.239.354-.337.134-.098.376-.254.726-.471l.56-.345c.473-.29.823-.554 1.055-.791.349-.354.568-.762.666-1.219.128-.599.037-1.077-.272-1.441-.312-.362-.793-.544-1.447-.544-.827 0-1.469.309-1.924.928-.239.323-.426.748-.555 1.275h1.182c.086-.347.184-.603.295-.761.193-.275.475-.414.844-.414.271 0 .461.087.568.261.107.173.135.392.076.652-.067.321-.258.616-.566.889-.203.173-.627.461-1.271.862-.744.461-1.246.896-1.506 1.31a3.403 3.403 0 0 0-.547 1.217zm9.641-2.284h-.701l.824-3.866h-1.365l-3.071 3.757-.228 1.062h2.449l-.281 1.332h1.189l.281-1.332h.701l.202-.953zm-3.44 0 2.115-2.673-.566 2.673h-1.549z"
			/>
		</svg>
	);
}
export { AvailabilitySvg };