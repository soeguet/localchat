import { useClientStore } from "../../stores/clientStore";
import { useUserStore } from "../../stores/userStore";

export function useClientChecker() {
	const clientDbId = useUserStore((state) => state.myId);
	const thisClient = useClientStore((state) =>
		state.getClientFromMapById(clientDbId),
	);
	return thisClient !== undefined;
}