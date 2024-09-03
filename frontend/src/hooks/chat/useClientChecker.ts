import { useClientStore } from "../../stores/clientStore";
import { useUserStore } from "../../stores/userStore";

export function useClientChecker() {
	const clientDbId = useUserStore((state) => state.myId);
	const thisClient = useClientStore((state) =>
		state.clientMap.get(clientDbId),
	);
	return thisClient !== undefined;
}
