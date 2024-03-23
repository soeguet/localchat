import {ReactionPayload} from "./customTypes";
import {isMessageFromThisClient} from "./messageHandler";
import {Notification} from "../../wailsjs/go/main/App";

export function notifyClientIfReactionTarget(payload: ReactionPayload) {

    const messageFromThisClient = isMessageFromThisClient(payload.reactionMessageId);

    if (messageFromThisClient) {
        Notification("localchat", payload.reactionContext + ": " + payload.reactionClientId + " reacted to your message");
    }
}