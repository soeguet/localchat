type CloseButtonProps = {
	title?: string;
	titleId?: string;
};
function CloseButton(props: CloseButtonProps) {
	return (
		<>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 32 32"
				width="2em"
				height="2em"
				aria-labelledby={props.titleId}>
				{props.title ? (
					<title id={props.titleId}>{props.title}</title>
				) : (
					<title>close</title>
				)}
				<g id="SVGRepo_iconCarrier">
					<defs>
						<style>
							{
								".cls-2{fill:none;stroke:#2e3192;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
							}
						</style>
					</defs>
					<title />
					<g id="_01" data-name={1}>
						<circle
							cx={16}
							cy={16}
							r={13}
							style={{
								fill: "#f2f2f2",
							}}
						/>
						<path
							d="M28.37 20a13 13 0 1 1 .63-4M12 12l8 8M20 12l-8 8"
							className="cls-2"
						/>
					</g>
				</g>
			</svg>
		</>
	);
}

export { CloseButton };
