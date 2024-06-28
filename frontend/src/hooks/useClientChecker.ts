import {useClientStore} from "../stores/clientStore";
import {useUserStore} from "../stores/userStore";

export function useClientChecker() {
// this client state
	const clientDbId = useUserStore((state) => state.myId);
	const thisClient = useClientStore((state) =>
		state.clients.find((c) => c.clientDbId === clientDbId),
	);
	if (thisClient === undefined) {
		return false;
	}
	return true;
}