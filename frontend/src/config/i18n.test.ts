// Import the necessary functions and types from Vitest
import { describe, it, expect } from "vitest";
import i18n from "./i18n";

beforeEach(() => {
    const localStorageMock = (function () {
        let store = {
            "language": "de",
        };
        return {
            getItem: function (key: "language") {
                return store[key] || null;
            },
            setItem: function (key: "language", value: "de" | "en" | "") {
                store[key] = value.toString();
            },
            clear: function () {
                store = {
                    "language": "",
                };
            }
        };
    })();

    vi.stubGlobal("localStorage", localStorageMock);
});

describe("i18n initialization", () => {
    it("should initialize with English as the default language", () => {
        expect(i18n.language).toBe("en");
    });

    it("should return \"de\"", () => {
        const language = localStorage.getItem("language") || "en";
        expect(language).toBe("de");
    });

    it("should return \"en\" after clearing the localStorage", () => {
        localStorage.clear();
        const language = localStorage.getItem("language") || "en";
        expect(language).toBe("en");
    });
});
