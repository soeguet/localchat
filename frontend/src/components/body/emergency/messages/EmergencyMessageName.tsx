import { HelpCallerSvg } from "../../../svgs/emergency/HelpCallerSvg";

type EmergencyMessageNameProps = {
	messageSenderColor: string;
	name: string;
	messageFromThisClient: boolean;
	initiator: boolean;
};
function EmergencyMessageName(props: EmergencyMessageNameProps) {
	const contentSide = props.messageFromThisClient
		? "flex-row-reverse"
		: "justify-start";
	return (
		<>
			<div
				className={`flex gap-3 font-semibold ${contentSide}`}
				style={{
					color: props.messageSenderColor,
				}}>
				{props.initiator && <HelpCallerSvg />}
				{props.name}
			</div>
		</>
	);
}

export { EmergencyMessageName };
