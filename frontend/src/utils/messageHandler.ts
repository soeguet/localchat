import {useMessageMapStore} from "../stores/messageMapStore";
import {useUserStore} from "../stores/userStore";

export function isMessageFromThisClient(messageDbId: string) {
    const messgeMap = useMessageMapStore.getState().messageMap;

    const message = messgeMap.get(messageDbId);

    if (message === undefined) {
        return false;
    }

    return message.clientType.clientDbId === useUserStore.getState().myId;
}