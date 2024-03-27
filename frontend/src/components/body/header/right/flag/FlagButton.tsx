import useSelectedLanguageStore from "../../../../../stores/selectedLanguageStore";
import { switchLanguage } from "../../../../../utils/i18n-helper";
import BritainFlagSvg from "../../../../svgs/flags/BritainFlagSvg";
import GermanFlagSvg from "../../../../svgs/flags/GermanFlagSvg";

function FlagButton() {
    const selectedLanguage: "en" | "de" = useSelectedLanguageStore(
        (state) => state.selectedLanguage
    );

    return (
        <div>
            <button
                data-testid="flag-button"
                onClick={switchLanguage}
                className="rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500"
            >
                {selectedLanguage === "en" ? (
                    <BritainFlagSvg />
                ) : (
                    <GermanFlagSvg />
                )}
            </button>
        </div>
    );
}

export default FlagButton;