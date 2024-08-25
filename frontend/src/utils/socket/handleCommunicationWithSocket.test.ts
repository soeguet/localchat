import { expect, test, describe } from "vitest";
import {useProfilePictureStore} from "../../stores/profilePictureStore";
import {_determineNewImageHash} from "./handleCommunicationWithSocket";
import useSettingsStore from "../../stores/settingsStore";

describe("handleCommunicationWithSocket", () => {

	beforeEach(() => {
		useProfilePictureStore.getState().setThisClientProfilePictureHashObject(null);
	});

	test("determineNewImageHash, no new image", () => {
		const newImageHash = _determineNewImageHash(false);

		expect(newImageHash).toBe("hash1");
	});

	test("determineNewImageHash, new image", () => {

		useSettingsStore.getState().setLocalProfilePicture("newImage");
		const newImageHash = _determineNewImageHash(true);

		expect(newImageHash).not.toBe("hash1");
	});
});