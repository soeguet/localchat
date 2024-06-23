type EmergencyMessageTimeProps = {
	thisClient: boolean;
	time: string;
};
function EmergencyMessageTime(props: EmergencyMessageTimeProps) {
	const side = props.thisClient ? "mr-3" : "ml-3";

	return (
		<>
			<div className={`flex items-center text-xl text-gray-400 ${side}`}>
				{props.time}
			</div>
		</>
	);
}

export { EmergencyMessageTime };
