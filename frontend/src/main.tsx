import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {App} from "./App";
import "./config/i18n";
import {WindowSetTitle} from "../wailsjs/runtime";
import {useEnvironmentVariablesLoader} from "./hooks/setup/useEnvLoader";
import {GetAllImages} from "../wailsjs/go/main/App";
import {useProfilePictureStore} from "./stores/profilePictureStore";
import {errorLogger} from "./logger/errorLogger";
import {useUserStore} from "./stores/userStore";

WindowSetTitle("Localchat");

type DbRow = {
    ImageHash: string;
    ClientDbId: string;
    Data: string;
};

// Load environment variables
try {
    await useEnvironmentVariablesLoader();
} catch (error) {
    console.error("Failed to load environment variables");
    errorLogger.logError(error);
}

// Load profile pictures
GetAllImages().then((allImages) => {
    const images = allImages as DbRow[];
    if (images === null) {
        return
    }

    const thisClientId = useUserStore.getState().myId;
    const setHashForThisClient = useProfilePictureStore.getState().setThisClientProfilePictureHashObject;
    const addToProfilePictureMap = useProfilePictureStore.getState().addToProfilePictureMap;

    for (const image of images) {

        if (image.ClientDbId === thisClientId) {
            setHashForThisClient({
                imageHash: image.ImageHash,
                clientDbId: image.ClientDbId,
                data: image.Data,
            });
        }

        addToProfilePictureMap(
            image.ClientDbId,
            {
                imageHash: image.ImageHash,
                clientDbId: image.ClientDbId,
                data: image.Data,

            })
    }

}).catch((e) => {
    console.error("Failed to load images from database");
    console.error(e);
    errorLogger.logError(new Error("Failed to load images from database"));
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);