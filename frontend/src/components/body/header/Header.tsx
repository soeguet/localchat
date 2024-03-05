import useDoNotDisturbStore from "../../../stores/doNotDisturbStore";
import HeaderLeft from "./left/HeaderLeft";
import HeaderMiddle from "./middle/HeaderMiddle";
import HeaderRight from "./right/HeaderRight";

function Header() {
    const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);

    const doNotDisturbCondition = `${doNotDisturb ? "bg-orange-700 text-white" : "bg-gray-700 text-white"}`;

    return (
        <div
            className={`${doNotDisturbCondition} flex items-center justify-between border-b-2 border-b-black px-4 pb-2 pt-1`}
        >
            <HeaderLeft />
            <HeaderMiddle />
            <HeaderRight />
        </div>
    );
}

export default Header;
