import { Notification } from "../../../wailsjs/go/main/App";
import { useClientStore } from "../../stores/clientStore";
import { useDoNotDisturbStore } from "../../stores/doNotDisturbStore";
import { useUserStore } from "../../stores/userStore";
import { base64ToUtf8 } from "../transformation/encoder";
import type { MessagePayload } from "../types/customTypes";

export async function notifyClientIfReactionTarget(payload: MessagePayload) {
	const messageFromThisClient =
		payload.clientType.clientDbId === useUserStore.getState().myId;

	// bail out if the payload is not a reaction
	if (payload.reactionType === undefined) return;
	if (!messageFromThisClient) return;

	// bail out if do not disturb is on
	const doNotDisturb = useDoNotDisturbStore.getState().doNotDisturb;
	if (doNotDisturb) return;

	const reaction = payload.reactionType[payload.reactionType.length - 1];
	const reactingClient = useClientStore
		.getState()
		.clientMap.get(reaction.reactionClientId)?.clientUsername;
	const reactionContext = reaction.reactionContext;
	const message = base64ToUtf8(payload.messageType.messageContext);

	await Notification(
		"localchat",
		`${reactingClient} reacted with ${reactionContext} to "${message}"`,
	);
}