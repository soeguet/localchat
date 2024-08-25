import { useEffect } from "react";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { useUserStore } from "../../../../../../stores/userStore";

function NewInputIp() {
	const localIp = useSettingsStore((state) => state.localIp);
	const setLocalIp = useSettingsStore((state) => state.setLocalIp);

	useEffect(() => {
		const usedIp = useUserStore.getState().socketIp;
		setLocalIp(usedIp);
	}, []);

	return (
		<div data-testid="settings-input-ip" className="flex flex-col">
			<label htmlFor="socketIp">Socket IP</label>
			<input
				type="text"
				id="socketIp"
				value={localIp ?? ""}
				onChange={(e) => setLocalIp(e.target.value)}
				className="mt-1 rounded-md border border-gray-300 p-2"
			/>
		</div>
	);
}

export { NewInputIp };