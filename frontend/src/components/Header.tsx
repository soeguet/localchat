import useDoNotDisturbStore from "../stores/doNotDisturbStore";
import HeaderLeft from "./body/header/HeaderLeft";
import HeaderMiddle from "./body/header/HeaderMiddle";
import HeaderRight from "./body/header/HeaderRight";

function Header() {
    const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);

    return (
        <div
            className={`${doNotDisturb ? "bg-orange-700 text-white" : "bg-gray-700 text-white"} pt-1 pb-2 px-4 flex justify-between items-center border-b-2 border-b-black`}
        >
            <HeaderLeft />
            <HeaderMiddle />
            <HeaderRight />
        </div>
    );
}

export default Header;
