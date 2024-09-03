import { changeLanguage } from "i18next";
import { useFontSizeStore } from "../../stores/fontSizeStore";
import { useSelectedLanguageStore } from "../../stores/selectedLanguageStore";
import useSettingsStore from "../../stores/settingsStore";
import { useUserStore } from "../../stores/userStore";

export async function handleWebsocketDataUpdates() {
	const newIp =
		useSettingsStore.getState().localIp ?? useUserStore.getState().socketIp;
	const newPort =
		useSettingsStore.getState().localPort ??
		useUserStore.getState().socketPort;

	const inUseIp = useUserStore.getState().socketIp;
	const inUsePort = useUserStore.getState().socketPort;

	// TODO validation needed
	if (newIp !== inUseIp || newPort !== inUsePort) {
		useUserStore.getState().setSocketIp(newIp);
		useUserStore.getState().setSocketPort(newPort);
	}
}

export function handleUsernameUpdates() {
	const newUsername =
		useSettingsStore.getState().localName ??
		useUserStore.getState().myUsername;
	useUserStore.getState().setMyUsername(newUsername);
}

export function handleAvailabilityUpdates() {
	const availability =
		useSettingsStore.getState().localAvailability ??
		useUserStore.getState().availability;
	useUserStore.getState().setAvailability(availability);
}

export function handleFontSizeUpdates() {
	const newFontSize =
		useSettingsStore.getState().fontSize ??
		useFontSizeStore.getState().fontSize;
	localStorage.setItem("fontSize", newFontSize.toFixed(0));
	useFontSizeStore.getState().setFontSize(newFontSize);
}

export async function handleLanguageUpdates() {
	const newLanguage =
		useSettingsStore.getState().language ??
		useSelectedLanguageStore.getState().selectedLanguage;
	localStorage.setItem("language", newLanguage);
	useSelectedLanguageStore.getState().setSelectedLanguage(newLanguage);
	await changeLanguage(newLanguage);
}