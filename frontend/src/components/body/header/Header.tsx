import { useDoNotDisturbStore } from "../../../stores/doNotDisturbStore";
import { HeaderLeft } from "./left/HeaderLeft";
import { HeaderMiddle } from "./middle/HeaderMiddle";
import { HeaderRight } from "./right/HeaderRight";

function Header() {
	const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);

	const doNotDisturbCondition = `${doNotDisturb ? "bg-orange-700" : "bg-gray-700"}`;

	return (
		<div
			data-testid="header"
			className={`${doNotDisturbCondition} flex items-center justify-between border-b-2 border-b-black px-4 pb-2 pt-1 text-white`}
		>
			<HeaderLeft />
			<HeaderMiddle />
			<HeaderRight />
		</div>
	);
}

export { Header };
