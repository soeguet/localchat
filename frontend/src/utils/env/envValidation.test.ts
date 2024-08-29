import {describe} from "vitest";
import {checkIfIpIsValid, checkIfPortIsValid, checkIfPortOutOfBounds} from "./envValidation";

describe("envValidation", () => {

    test("checkIfPortOutOfBounds", () => {
        const portOutOfBounds = checkIfPortOutOfBounds("65536");
        expect(portOutOfBounds).toBe(true);

        const portInBounds = checkIfPortOutOfBounds("65535");
        expect(portInBounds).toBe(false);

        const portInBounds2 = checkIfPortOutOfBounds("0");
        expect(portInBounds2).toBe(false);

        const portInBounds3 = checkIfPortOutOfBounds("-1");
        expect(portInBounds3).toBe(true);
    });

    test("checkIfPortIsValid", () => {
        const portIsValid = checkIfPortIsValid("65535");
        expect(portIsValid).toBe(true);

        const portIsValid2 = checkIfPortIsValid("asdf");
        expect(portIsValid2).toBe(false);
    });

    test("checkIfIpIsValid", () => {
        const ipIsValid = checkIfIpIsValid("127.0.0.1");
        expect(ipIsValid).toBe(true);

        const ipIsValid2 = checkIfIpIsValid("127.0.0.1.1");
        expect(ipIsValid2).toBe(false);

        const ipIsValid3 = checkIfIpIsValid("192.168.1.1");
        expect(ipIsValid3).toBe(true);

        const ipIsValid4 = checkIfIpIsValid("192.168.255.255");
        expect(ipIsValid4).toBe(true);

        const ipIsValid5 = checkIfIpIsValid("192.168.256.255");
        expect(ipIsValid5).toBe(false);

        const ipIsValid6 = checkIfIpIsValid("192.168.255.256");
        expect(ipIsValid6).toBe(false);

        const ipIsValid7 = checkIfIpIsValid("192.168.255.256.1");
        expect(ipIsValid7).toBe(false);
    });
});