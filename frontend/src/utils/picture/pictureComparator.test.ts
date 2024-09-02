import { describe, expect, test } from "vitest";
import { useClientStore } from "../../stores/clientStore";
import useSettingsStore from "../../stores/settingsStore";
import { useUserStore } from "../../stores/userStore";
import { ClientEntity } from "../types/customTypes";
import { checkIfImageChanged, compareBase64Images } from "./pictureComparator";

describe("pictureComparator", () => {
	test("test if images are the same", () => {
		const oldImage = "test";
		const newImage = "test";

		const sameImage = compareBase64Images(oldImage, newImage);

		expect(sameImage).toBe(true);
	});

	test("test if images are different", () => {
		const oldImage = "test";
		const newImage = "test2";

		const sameImage = compareBase64Images(oldImage, newImage);

		expect(sameImage).toBe(false);
	});

	test("test if image changed, no old, no new image set", () => {
		const imageCheck = checkIfImageChanged();
		expect(imageCheck).toBe(false);
	});

	test("test if image changed, no old image set", () => {
		useUserStore.getState().setMyId("1");
		// TODO setting clients will ask backend for the image via hash -> extract it or mock it

		const map = new Map<string, ClientEntity>();
		map.set("1", {
			clientDbId: "1",
			clientProfilePictureBase64: "test",
			availability: true,
			clientUsername: "TestUser",
			clientProfilePictureHash: "imagehash",
		});
		useClientStore.getState().setClientMap(map);
		// random base64 string for an image
		useSettingsStore.getState().setLocalProfilePicture("base64string");

		const imageCheck = checkIfImageChanged();

		expect(imageCheck).toBe(true);
	});
});
//import useSettingsStore from "../../stores/settingsStore";
//import CryptoJS from "crypto-js";
//import { useUserStore } from "../../stores/userStore";
//import { useClientStore } from "../../stores/clientStore";
//
//export function checkIfImageChanged() {
//    const myId = useUserStore.getState().myId;
//    const oldImage = useClientStore.getState().clients.find(
//        (client) => client.clientDbId === myId,
//    )?.clientProfilePictureBase64;
//    const newImage = useSettingsStore.getState().localProfilePicture;
//
//    // if no image is set, always return true
//    if (newImage === "" || newImage === null) {
//        return false;
//    }if (!oldImage || oldImage === "") {
//        return true;
//    }
//
//    const sameImage = compareBase64Images(oldImage, newImage);
//    return !sameImage;
//}
//
//function compareBase64Images(image1: string, image2: string) {
//    // remove whitespaces first
//    const cleanedImage1 = image1.replace(/\s/g, '');
//    const cleanedImage2 = image2.replace(/\s/g, '');
//
//    const hash1 = hashBase64Image(cleanedImage1);
//    const hash2 = hashBase64Image(cleanedImage2);
//
//    return hash1 === hash2;
//}
//
//export function hashBase64Image(base64: string): string {
//    const hashedValue = CryptoJS.SHA256(base64)
//    return hashedValue.toString(CryptoJS.enc.Hex);
//}