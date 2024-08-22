import { changeLanguage } from "i18next";
import { useSelectedLanguageStore } from "../../stores/selectedLanguageStore";
import useSettingsStore from "../../stores/settingsStore";
import { useUserStore } from "../../stores/userStore";
import { useFontSizeStore } from "../../stores/fontSizeStore";

export async function handleLocalSettingsUpdates(): Promise<number> {
	const newLanguage = useSettingsStore.getState().language;
	const newFontSize = useSettingsStore.getState().fontSize;
	const newIp = useSettingsStore.getState().localIp;
	const newPort = useSettingsStore.getState().localPort;
	const inUseIp = useUserStore.getState().socketIp;
	const inUsePort = useUserStore.getState().socketPort;
	const availability = useSettingsStore.getState().availability;

	localStorage.setItem("language", newLanguage);
	useSelectedLanguageStore.getState().setSelectedLanguage(newLanguage);
	await changeLanguage(newLanguage);

	localStorage.setItem("fontSize", newFontSize.toFixed(0));
	useFontSizeStore.getState().setFontSize(newFontSize);

	// TODO validation needed
	if (newIp !== inUseIp || newPort !== inUsePort) {
		useUserStore.getState().setSocketIp(newIp);
		useUserStore.getState().setSocketPort(newPort);
		return 1500;
	}

	useUserStore.getState().setAvailability(availability);

	return 0;
}