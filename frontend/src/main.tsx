import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import "./config/i18n";
import { WindowSetTitle } from "../wailsjs/runtime";
import { useEnvironmentVariablesLoader } from "./hooks/setup/useEnvLoader";
import { GetAllImages } from "../wailsjs/go/main/App";
import { useProfilePictureStore } from "./stores/profilePictureStore";

WindowSetTitle("Localchat");

type DbRow = {
	ImageHash: string;
	ClientDbId: string;
	Data: string;
};

// load environment variables and profile pictures
(async () => {
	await useEnvironmentVariablesLoader();
	const allImages: DbRow[] = (await GetAllImages()) as DbRow[];

	console.log("allImages", allImages);

	if (allImages == null) {
		console.error("Failed to load images from database");
		return;
	}

	const imageStoreMap = useProfilePictureStore.getState().profilePictureMap;
	for (const image of allImages) {
		imageStoreMap.set(image.ClientDbId, {
			clientDbId: image.ClientDbId,
			imageHash: image.ImageHash,
			data: image.Data,
		});
	}

	useProfilePictureStore.getState().setProfilePictureMap(imageStoreMap);
})();

// biome-ignore lint/style/noNonNullAssertion: react
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
