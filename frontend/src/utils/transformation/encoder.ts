// TODO check if this is deprecated
export function utf8ToBase64(str: string) {
	const uint8Array = new TextEncoder().encode(str);
	const stringFromUint8Array = String.fromCharCode(...uint8Array);
	return btoa(stringFromUint8Array);
}

export function base64ToUtf8(base64: string) {
	if (base64 === undefined || base64 === null || base64 === "") {
		return "";
	}

	const strFromBase64 = atob(base64);
	const uint8Array = new Uint8Array(
		strFromBase64.split("").map((char) => char.charCodeAt(0)),
	);
	return new TextDecoder().decode(uint8Array);
}

export function getMimeType(base64: string) {
	const match = base64.match(/^data:(.*);base64,/);
	return match ? match[1] : "";
}

export function encodeFileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
}