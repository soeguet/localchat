import useSelectedLanguageStore from "../../../../stores/selectedLanguageStore";
import {switchLanguage} from "../../../../utils/i18n-helper";
import AmericanFlagSvg from "../../../svgs/flags/AmericanFlagSvg";
import GermanFlagSvg from "../../../svgs/flags/GermanFlagSvg";

function FlagButton() {

    const selectedLanguage = useSelectedLanguageStore((state) => state.selectedLanguage);

    return (
        <div>
            <button
                onClick={() => switchLanguage()}
                className="rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500"
            >
                {selectedLanguage === "en" ? (
                    <AmericanFlagSvg/>
                ) : (
                    <GermanFlagSvg/>
                )}
            </button>
        </div>
    );
}

export default FlagButton;
