import { useSelectedLanguageStore } from "../../../../../stores/selectedLanguageStore";
import { switchLanguage } from "../../../../../utils/i18n-helper";
import { AmericaFlagNoCircle } from "../../../../svgs/flags/AmericaFlagNoCircle";
import { GermanFlagNoCircle } from "../../../../svgs/flags/GermanFlagNoCircle";

function FlagButton() {
	const selectedLanguage: "en" | "de" = useSelectedLanguageStore(
		(state) => state.selectedLanguage,
	);

	return (
		<div>
			<button
				type="button"
				data-testid="flag-button"
				onClick={switchLanguage}
				className="rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500"
			>
				{selectedLanguage === "en" ? (
					<AmericaFlagNoCircle />
				) : (
					<GermanFlagNoCircle />
				)}
			</button>
		</div>
	);
}

export { FlagButton };
