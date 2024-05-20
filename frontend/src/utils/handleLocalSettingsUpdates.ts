import { changeLanguage } from "i18next";
import { useSelectedLanguageStore } from "../stores/selectedLanguageStore";
import useSettingsStore from "../stores/settingsStore";
import { useUserStore } from "../stores/userStore";

export function handleLocalSettingsUpdates(): number {
    const newLanguage = useSettingsStore.getState().language;
    const newFontSize = useSettingsStore.getState().fontSize;
    const newIp = useSettingsStore.getState().localIp;
    const newPort = useSettingsStore.getState().localPort;
    const inUseIp = useUserStore.getState().socketIp;
    const inUsePort = useUserStore.getState().socketPort;

    localStorage.setItem("language", newLanguage);
    useSelectedLanguageStore.getState().setSelectedLanguage(newLanguage);
    changeLanguage(newLanguage);

    localStorage.setItem("fontSize", newFontSize.toFixed(0));

    // TODO validation needed
    if (newIp !== inUseIp || newPort !== inUsePort) {
        useUserStore.getState().setSocketIp(newIp);
        useUserStore.getState().setSocketPort(newPort);
        return 1500;
    }

    return 0;
}