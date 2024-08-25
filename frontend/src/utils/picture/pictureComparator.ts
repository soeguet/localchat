import useSettingsStore from "../../stores/settingsStore";
import {useProfilePictureStore} from "../../stores/profilePictureStore";
import CryptoJS from "crypto-js";

export function checkIfImageChanged() {
    const oldImage = useProfilePictureStore.getState().thisClientProfilePictureObject;
    const newImage = useSettingsStore.getState().localProfilePicture;

    // if no image is set, always return true
    if (newImage === "" || newImage === null) {
        return false;
    }if (!oldImage) {
        return true;
    }

    return compareBase64Images(oldImage.data, newImage);
}

function compareBase64Images(image1: string, image2: string) {
    // remove whitespaces first
    const cleanedImage1 = image1.replace(/\s/g, '');
    const cleanedImage2 = image2.replace(/\s/g, '');

    const hash1 = hashBase64Image(cleanedImage1);
    const hash2 = hashBase64Image(cleanedImage2);

    return hash1 === hash2;
}

export function hashBase64Image(base64: string): string {
    const hashedValue = CryptoJS.SHA256(base64)
    return hashedValue.toString(CryptoJS.enc.Hex);
}
