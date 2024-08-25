import {test} from "vitest";
import {
    ClientListPayloadEnhanced,
    ClientListPayloadEnhancedSchema,
    PayloadSubTypeEnum
} from "../types/customTypes";

describe('clientListHandler', () => {

    test('validate schema - with null values', () => {
        const clientListPayload: ClientListPayloadEnhanced = {
            payloadType: PayloadSubTypeEnum.enum.clientList,
            clients: [
                {
                    clientDbId: "052b6447-bb63-4a10-adf0-905f3c21eac2",
                    clientUsername: "Framework",
                    clientColor: null,
                    clientProfilePictureHash: null,
                    availability: true,
                }
            ],
            version: {
                major: 1,
                minor: 0,
                patch: 0,
            },
        };
        const validation = ClientListPayloadEnhancedSchema.safeParse(clientListPayload);
        expect(validation.success).toBe(true);
    });

    test('validate schema - empty array', () => {
        const clientListPayload: ClientListPayloadEnhanced = {
            payloadType: PayloadSubTypeEnum.enum.clientList,
            clients: [],
            version: {
                major: 1,
                minor: 0,
                patch: 0,
            },
        };
        const validation = ClientListPayloadEnhancedSchema.safeParse(clientListPayload);
        expect(validation.success).toBe(true);
    });
    test('validate schema - without null values', () => {
        const clientListPayload: ClientListPayloadEnhanced = {
            payloadType: PayloadSubTypeEnum.enum.clientList,
            clients: [
                {
                    clientDbId: "052b6447-bb63-4a10-adf0-905f3c21eac2",
                    clientUsername: "Framework",
                    clientColor: "#000000",
                    clientProfilePictureHash: "imagehash",
                    availability: true,
                }
            ],
            version: {
                major: 1,
                minor: 0,
                patch: 0,
            },
        };
        const validation = ClientListPayloadEnhancedSchema.safeParse(clientListPayload);
        expect(validation.success).toBe(true);
    });
    test('validate real payload', () => {
        const realPayload = `{"payloadType":2,"version":{"major":0,"minor":12,"patch":2},"clients":[{"clientDbId":"052b6447-bb63-4a10-adf0-905f3c21eac2","clientUsername":"Framework","clientColor":null,"clientProfilePictureHash":null,"availability":true}]}`;
        const validation = ClientListPayloadEnhancedSchema.safeParse(JSON.parse(realPayload));
        expect(validation.success).toBe(true);
    });
});