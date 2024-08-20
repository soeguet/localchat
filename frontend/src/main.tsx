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
    await errorLogger.logError(error);
}

// Load profile pictures
GetAllImages().then((allImages) => {

    const images = allImages as DbRow[];
    console.log("images", images);

    if (allImages !== null) {

        const imageStoreMap = useProfilePictureStore.getState().profilePictureMap;

        for (const image of images) {
            imageStoreMap.set(image.ClientDbId, {
                clientDbId: image.ClientDbId,
                imageHash: image.ImageHash,
                data: image.Data,
            });
        }

        useProfilePictureStore.getState().setProfilePictureMap(imageStoreMap);
    }

}).catch(() => {
    console.error("Failed to load images from database");
    errorLogger.logError(new Error("Failed to load images from database"));
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);