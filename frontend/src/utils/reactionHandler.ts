import {MessagePayload} from "./customTypes";
import useUserStore from "../stores/userStore";
import {Notification} from "../../wailsjs/go/main/App";
import useClientStore from "../stores/clientStore";
import {base64ToUtf8} from "./encoder";

export function notifyClientIfReactionTarget(payload: MessagePayload) {

    const messageFromThisClient = payload.clientType.clientDbId === useUserStore.getState().myId;

    if (payload.reactionType === undefined) return;
    if (!messageFromThisClient) return;

    const reaction = payload.reactionType[payload.reactionType.length - 1];
    const reactingClient = useClientStore.getState().clients.find((client) => client.clientDbId === reaction.reactionClientId)?.clientUsername;
    const reactionContext = reaction.reactionContext;
    const message = base64ToUtf8(payload.messageType.messageContext);


    Notification("localchat", `${reactingClient} reacted with ${reactionContext} to "${message}"`);
}