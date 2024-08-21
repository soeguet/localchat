import { renderHook } from "@testing-library/react";
import { useInitializeSelectedAppLanguageFromLocalStorage } from "./useLanguageLoader";
import { expect } from "vitest";
import { useSelectedLanguageStore } from "../../stores/selectedLanguageStore";

beforeEach(() => {
	const localStorageMock = (() => {
		let store = {
			language: "en",
		};
		return {
			getItem: (key: "language") => store[key] || null,
			setItem: (key: "language", value: "de" | "en" | "") => {
				store[key] = value.toString();
			},
			clear: () => {
				store = {
					language: "",
				};
			},
		};
	})();

	vi.stubGlobal("localStorage", localStorageMock);
});

describe("useLanguageLoader", () => {
	it("should load the language from local storage", () => {
		renderHook(() => useInitializeSelectedAppLanguageFromLocalStorage());

		expect(useSelectedLanguageStore.getState().selectedLanguage).toBe("en");
	});
});