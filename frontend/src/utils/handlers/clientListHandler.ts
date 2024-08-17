import {handleClientListPayload, updateThisClientsCachedDataWithNewPayloadData} from "../../hooks/socket/utils";
import {processClientsProfilePictures} from "../profilePictureInitializer";
import {ClientListPayloadEnhancedSchema} from "../customTypes";
import {errorLogger} from "../../logger/errorLogger";

export async function clientListHandler(event: MessageEvent) {

    const clientListValidation = ClientListPayloadEnhancedSchema.safeParse(JSON.parse(event.data));

    if (clientListValidation.success) {

        handleClientListPayload(clientListValidation.data);
        updateThisClientsCachedDataWithNewPayloadData(clientListValidation.data);
        await processClientsProfilePictures(clientListValidation.data.clients);

    } else {

        console.error("Failed to parse client list payload");
        errorLogger.logError(new Error("Failed to parse client list payload"));
        throw new Error("Failed to parse client list payload");

    }

}