import { useEffect, useState } from "react";
import { useUnseenMessageCountStore } from "../../../stores/unseenMessageCountStore";
import { useTranslation } from "react-i18next";

function UnreadMessagesSvg() {
	const [color, setColor] = useState("#ff0000");
	const { t } = useTranslation();
	const unseenMessageCount = useUnseenMessageCountStore(
		(state) => state.unseenMessageCount
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setColor((currentColor) =>
				currentColor === "#ff0000" ? "#000000" : "#ff0000"
			);
		}, 750);

		return () => clearInterval(interval);
	}, []);

	const textX = unseenMessageCount > 9 ? 21 : 19;
	const textY = 22;

	return (
		<svg
			data-testid="unread-messages-svg"
			width="2.1em"
			height="2.1em"
			viewBox="-2.4 -2.4 28.80 28.80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="transition duration-300 ease-in-out"
			stroke={color}>
			<title>
				{t("title_svg_unread_messages", { count: unseenMessageCount })}
			</title>
			<g id="SVGRepo_bgCarrier" strokeWidth="0">
				<rect
					x="-2.4"
					y="-2.4"
					width="28.80"
					height="28.80"
					rx="14.4"
					fill="#ffffff"
					strokeWidth="0"
				/>
			</g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M10 21H3.86159C3.47768 21 3.23699 20.5853 3.42747 20.2519L4.64529 17.6317C4.7226 17.4653 4.70168 17.2707 4.59721 17.1199C3.5901 15.6665 3 13.9021 3 12C3 7.02944 7.02944 3 12 3C17.297 3 21.524 7.76292 20.9451 13"
					stroke="#ff0000"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</g>
			{unseenMessageCount > 0 && (
				<text
					x={textX}
					y={textY}
					textAnchor="end"
					fontWeight="1"
					fontSize="8"
					fill="#000">
					{unseenMessageCount}
				</text>
			)}
		</svg>
	);
}

export { UnreadMessagesSvg };

