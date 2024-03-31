describe('encoder methods', () => {
    it("base64ToUtf8 testing", () => {
        expect(base64ToUtf8("aGVsbG8=")).toBe("hello");
        expect(base64ToUtf8("d29ybGQ=")).toBe("world");

    });
});

