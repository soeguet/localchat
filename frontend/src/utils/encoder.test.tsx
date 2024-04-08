import {base64ToUtf8, utf8ToBase64} from "./encoder";

describe("encoder methods", () => {
    it("base64ToUtf8 testing", () => {
        expect(base64ToUtf8("aGVsbG8=")).toBe("hello");
        expect(base64ToUtf8("d29ybGQ=")).toBe("world");

    });

    it("base64ToUtf8 testing", () => {
        expect(base64ToUtf8("aGVsbG8=")).not.toBe("world");
        expect(base64ToUtf8("d29ybGQ=")).not.toBe("hello");
    });

    it("utf8ToBase64 testing", () => {
        expect(utf8ToBase64("hello")).toBe("aGVsbG8=");
        expect(utf8ToBase64("world")).toBe("d29ybGQ=");
    });

    it("utf8ToBase64 testing", () => {
        expect(utf8ToBase64("hello")).not.toBe("d29ybGQ=");
        expect(utf8ToBase64("world")).not.toBe("aGVsbG8=");
    });
});