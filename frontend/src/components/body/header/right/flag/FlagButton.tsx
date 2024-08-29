import { useSelectedLanguageStore } from "../../../../../stores/selectedLanguageStore";
import { switchLanguage } from "../../../../../utils/i18n/i18n-helper";
import { AmericaFlagNoCircle } from "../../../../svgs/flags/AmericaFlagNoCircle";
import { GermanFlagNoCircle } from "../../../../svgs/flags/GermanFlagNoCircle";
import {DEFAULT_HOVER_COLOR} from "../../../../../utils/variables/variables";
import {useUserStore} from "../../../../../stores/userStore";
import {useState} from "react";

function FlagButton() {
	const selectedLanguage: "en" | "de" = useSelectedLanguageStore(
		(state) => state.selectedLanguage,
	);

	const thisClientColor = useUserStore((state) => state.myColor);
	const [hover, setHover] = useState(false);

	return (
		<div>
			<button
				type="button"
				data-testid="flag-button"
				onClick={switchLanguage}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				style={{
					borderColor: hover ? DEFAULT_HOVER_COLOR : thisClientColor,
				}}
				className="rounded-full border-2 text-white transition duration-300 ease-in-out"
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