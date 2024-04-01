import {MessagePayload} from "./customTypes";
import {useUserStore} from "../stores/userStore";
import {Notification} from "../../wailsjs/go/main/App";
import {useClientStore} from "../stores/clientStore";
import {base64ToUtf8} from "./encoder";
import {useDoNotDisturbStore} from "../stores/doNotDisturbStore";

export function notifyClientIfReactionTarget(payload: MessagePayload) {

    const messageFromThisClient = payload.clientType.clientDbId === useUserStore.getState().myId;

    // bail out if the payload is not a reaction
    if (payload.reactionType === undefined) return;
    if (!messageFromThisClient) return;

    // bail out if do not disturb is on
    const doNotDisturb = useDoNotDisturbStore.getState().doNotDisturb;
    if (doNotDisturb) return;

    const reaction = payload.reactionType[payload.reactionType.length - 1];
    const reactingClient = useClientStore.getState().clients.find((client) => client.clientDbId === reaction.reactionClientId)?.clientUsername;
    const reactionContext = reaction.reactionContext;
    const message = base64ToUtf8(payload.messageType.messageContext);

    Notification("localchat", `${reactingClient} reacted with ${reactionContext} to "${message}"`);
}