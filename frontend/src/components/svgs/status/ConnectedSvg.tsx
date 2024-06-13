import { svgSize } from "../../../utils/variables";

function ConnectedSvg() {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				data-name="Line Color"
				viewBox="-2.4 -2.4 28.8 28.8"
				className="border-2 border-black rounded-full"
				width="2.5em"
				height="2.5em">
				<title>connected</title>
				<rect
					width={28.8}
					height={28.8}
					x={-2.4}
					y={-2.4}
					fill="#fff"
					strokeWidth={0}
					rx={14.4}
				/>
				<path
					d="m8 11.5 3 3 5-5"
					style={{
						fill: "none",
						stroke: "#3ecc55",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeWidth: 2,
					}}
				/>
				<rect
					width={18}
					height={18}
					x={3}
					y={3}
					rx={9}
					style={{
						fill: "none",
						stroke: "#000",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeWidth: 2,
					}}
				/>
			</svg>{" "}
		</>
	);
}

export { ConnectedSvg };

