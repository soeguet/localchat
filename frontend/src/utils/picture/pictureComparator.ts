import CryptoJS from "crypto-js";
import { useClientStore } from "../../stores/clientStore";
import useSettingsStore from "../../stores/settingsStore";
import { useUserStore } from "../../stores/userStore";

export function checkIfImageChanged() {
	const myId = useUserStore.getState().myId;
	const oldImage = useClientStore
		.getState()
		.clientMap.get(myId)?.clientProfilePictureBase64;
	const newImage = useSettingsStore.getState().localProfilePicture;

	// if no image is set, always return true
	if (newImage === "" || newImage === null) {
		return false;
	}
	if (!oldImage || oldImage === "") {
		return true;
	}

	const sameImage = compareBase64Images(oldImage, newImage);
	return !sameImage;
}

export function compareBase64Images(image1: string, image2: string) {
	// remove whitespaces first
	const cleanedImage1 = image1.replace(/\s/g, "");
	const cleanedImage2 = image2.replace(/\s/g, "");

	const hash1 = hashBase64Image(cleanedImage1);
	const hash2 = hashBase64Image(cleanedImage2);

	return hash1 === hash2;
}

export function hashBase64Image(base64: string): string {
	const hashedValue = CryptoJS.SHA256(base64);
	return hashedValue.toString(CryptoJS.enc.Hex);
}