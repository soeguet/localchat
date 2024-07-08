import { useEffect } from "react";
import { useSelectedLanguageStore } from "../stores/selectedLanguageStore";

export function useInitializeSelectedAppLanguageFromLocalStorage() {
	useEffect(() => {
		const selectedLanguage = localStorage.getItem("language");

		if (selectedLanguage) {
			useSelectedLanguageStore
				.getState()
				.setSelectedLanguage(selectedLanguage as "de" | "en");
		}
	}, []);
}
