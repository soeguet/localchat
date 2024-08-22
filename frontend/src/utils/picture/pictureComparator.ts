import useSettingsStore from "../../stores/settingsStore";
import {useProfilePictureStore} from "../../stores/profilePictureStore";
import {useUserStore} from "../../stores/userStore";
import {errorLogger} from "../../logger/errorLogger";

export async function checkIfImageChanged() {
    debugger
    const oldImage = useProfilePictureStore.getState().thisClientProfilePictureObject;
    const newImage = useSettingsStore.getState().localProfilePicture;

    // if no image is set, always return true
    if (newImage == "" || newImage === null) {
        return false;
    } else if (!oldImage) {
        return true;
    }

    try {
        // TODO FIX THIS!
        return await compareBase64Images(oldImage.data, newImage);
    } catch (e) {
        return true;
    }
}

async function compareBase64Images(image1: string, image2: string) {
    // remove whitespaces first
    const cleanedImage1 = image1.replace(/\s/g, '');
    const cleanedImage2 = image2.replace(/\s/g, '');

    const hash1 = await hashBase64Image(cleanedImage1);
    const hash2 = await hashBase64Image(cleanedImage2);

    return hash1 === hash2;
}

export async function hashBase64Image(base64: string) {
    // Remove the data URL part if it exists
    const base64Data = base64.split(',')[1];

    // Decode the base64 string to binary data
    let view: Uint8Array
    let binary: string
    let len: number
    let buffer: ArrayBuffer

    try {
        binary = atob(base64Data);
        len = binary.length;
        buffer = new ArrayBuffer(len);
        view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }

    } catch (e) {
        errorLogger.logError(e);
        console.error("Failed to decode base64 image");
        throw new Error("Failed to decode base64 image");
    }

    // Hash the binary data using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}