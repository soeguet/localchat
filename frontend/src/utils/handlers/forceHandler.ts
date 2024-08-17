import {useUserStore} from "../../stores/userStore";
import {useDoNotDisturbStore} from "../../stores/doNotDisturbStore";
import {Notification} from "../../../wailsjs/go/main/App";
import {WindowMinimise, WindowShow, WindowUnminimise} from "../../../wailsjs/runtime";
import {ForcePayloadSchema} from "../customTypes";
import {errorLogger} from "../../logger/errorLogger";

export async function forceHandler(event: MessageEvent) {

    const forcePayloadValidation = ForcePayloadSchema.safeParse(JSON.parse(event.data));

    if (forcePayloadValidation.success) {

        if (forcePayloadValidation.data.clientDbId === useUserStore.getState().myId) {
            // just to be safe if the client does not want to get notifications!
            if (!useDoNotDisturbStore.getState().doNotDisturb) {
                await Notification("ALARM", "PLEASE CHECK THE CHAT");

                setTimeout(() => {
                    WindowUnminimise();
                }, 1000);
                WindowMinimise();
                WindowShow();
            }
        }

    } else {

        console.error("Failed to parse force payload");
        errorLogger.logError(new Error("Failed to parse force payload"));
        throw new Error("Failed to parse force payload");

    }
}