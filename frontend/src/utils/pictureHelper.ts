import type { ChangeEvent } from "react";
import useSettingsStore from "../stores/settingsStore";
import { useTranslation } from "react-i18next";

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			resolve(reader.result as ArrayBuffer);
		};

		reader.onerror = () => {
			reject(reader.error);
		};

		reader.readAsArrayBuffer(file);
	});
}

// TODO to be tested after refactoring
export async function handleFileChange(
	event: ChangeEvent<HTMLInputElement>,
	error_text: string,
) {
	const file = event.target.files?.[0] || null;
	const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
	if (!file) {
		throw new Error("No file selected.");
	}

	if (file && !allowedTypes.includes(file.type)) {
		alert(error_text);
		event.target.value = "";
	}

	try {
		const arrayBuffer = await readFileAsArrayBuffer(file);
		// convert ArrayBuffer to base64 string
		const base64String = arrayBufferToBase64(arrayBuffer);
		const pictureUrl = `data:image/jpeg;base64,${base64String}`;
		// TODO refactor this part
		useSettingsStore.getState().setLocalProfilePicture(pictureUrl);
	} catch (error) {
		console.error("Error reading the file.", error);
	}
}
