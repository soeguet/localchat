import { describe, expect, test } from "vitest";
import { useClientStore } from "../../stores/clientStore";
import { usePictureCacheStore } from "../../stores/pictureCacheStore";
import useSettingsStore from "../../stores/settingsStore";
import { useUserStore } from "../../stores/userStore";
import type { ProfilePictureObject } from "../types/customTypes";
import { _determineNewImageHash } from "./handleCommunicationWithSocket";

describe("handleCommunicationWithSocket", () => {
	beforeEach(() => {
		usePictureCacheStore
			.getState()
			.setThisClientProfilePictureHashObject(null);
	});

	test.skip("determineNewImageHash, no new image", () => {
		useUserStore.getState().setMyId("1");
		useClientStore.getState().setClients([
			{
				clientDbId: "1",
				clientProfilePictureHash: "hash1",
				clientProfilePictureBase64: "data",
				availability: true,
				clientUsername: "TestUser",
			},
		]);
		console.log(useClientStore.getState().clients);

		const newImageHash = _determineNewImageHash(false);

		expect(newImageHash).toBe("hash1");
	});

	test("determineNewImageHash, new image", () => {
		useSettingsStore.getState().setLocalProfilePicture("newImage");
		const newImageHash = _determineNewImageHash(true);

		expect(newImageHash).not.toBe("hash1");
	});

	test("determineNewImageHash, no old image", () => {
		const profilePictureObject: ProfilePictureObject = {
			clientDbId: "1",
			imageHash:
				"3a6eb0790f39ac87c94f3856b2dd2c5d110e6811602261a9a923d3bb23adc8b7",
			data: "data",
		};
		useSettingsStore
			.getState()
			.setLocalProfilePicture(profilePictureObject.data);
		const newImageHash = _determineNewImageHash(true);

		expect(newImageHash).toBe(profilePictureObject.imageHash);
	});
});