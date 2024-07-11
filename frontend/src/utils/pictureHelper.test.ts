import { arrayBufferToBase64, handleFileChange } from "./pictureHelper";
import { describe } from "vitest";
import { readFileAsArrayBuffer } from "./pictureHelper";
import type { ChangeEvent } from "react";

describe("pictureHelper - arrayBufferToBase64", () => {
	test("arrayBufferToBase64 function - converting ArrayBuffer to Base64 string", () => {
		// Given
		const buffer = new ArrayBuffer(10);
		const view = new Int8Array(buffer);
		for (let i = 0; i < 10; i++) {
			view[i] = i;
		}
		// Convert arrayBuffer to Base64 manually for testing
		let binary = "";
		const bytes = new Uint8Array(buffer);
		for (let i = 0; i < bytes.byteLength; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		const expectedBase64 = window.btoa(binary);

		// When
		const result = arrayBufferToBase64(buffer);

		// Then
		expect(result).toBe(expectedBase64);
	});
});

describe("pictureHelper - readFileAsArrayBuffer", () => {
	test("resolves with ArrayBuffer on success", async () => {
		const mockFile = new File(["test content"], "test.txt", {
			type: "text/plain",
		});
		const arrayBuffer = await readFileAsArrayBuffer(mockFile);

		expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);
	});

	// TODO more test cases needed
});

describe("pictureHelper - handleFileChange", () => {
	test("throws an error when no file is selected", async () => {
		const event = {
			target: {
				files: null,
			},
			message: "",
		} as unknown as ChangeEvent<HTMLInputElement>;

		try {
			await handleFileChange(event, "error text");
		} catch (error) {
			expect(error).toBeInstanceOf(Error);

			expect((error as Error).message).toBe("No file selected.");
		}
	});

	test.skip("test error route with file reading error", async () => {
		const event = {
			target: {
				files: [
					new File(["test content"], "test.txt", {
						type: "text/plain",
					}),
				],
			},
			message: "",
		} as unknown as ChangeEvent<HTMLInputElement>;

		const spy = vi.spyOn(console, "error").mockImplementation(() => {});

		await handleFileChange(event, "error text");

		expect(spy).toHaveBeenCalled();
	});
});
