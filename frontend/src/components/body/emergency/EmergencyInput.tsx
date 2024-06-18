import { SendButtonSvg } from "../../svgs/input/SendButtonSvg";

function EmergencyInput() {
	return (
		<>
			<div className="flex w-full gap-2 p-2">
				<textarea className="w-full rounded-lg border border-black/50 px-2 py-0.5" />
				<div className="flex h-full items-center">
					<SendButtonSvg />
				</div>
			</div>
		</>
	);
}

export { EmergencyInput };
