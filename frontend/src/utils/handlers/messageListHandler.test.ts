import {describe, expect} from "vitest";
import {
    MessageListPayload,
    MessageListPayloadSchema,
    MessagePayload,
    MessagePayloadSchema,
    PayloadSubTypeEnum,
} from "../customTypes";

describe("messageListHandler", () => {

    test("parsing messagepayload", () => {

        const messagePayload: MessagePayload = {
            payloadType: PayloadSubTypeEnum.enum.message,
            clientType: {
                clientDbId: "1",
            },
            messageType: {
                deleted: false,
                edited: false,
                messageDbId: "1",
                messageTime: "12:00",
                messageContext: "aGVubG8=",
                messageDate: "2021-10-10",
            },
            reactionType: [],
        };

        const messagePayloadValidation = MessagePayloadSchema.safeParse(messagePayload);

        expect(messagePayloadValidation.success).toBe(true);
    });

    test("parsing messagepayload - with null in quoteType", () => {

        const messagePayload: MessagePayload = {
            payloadType: PayloadSubTypeEnum.enum.message,
            clientType: {
                clientDbId: "1",
            },
            messageType: {
                deleted: false,
                edited: false,
                messageDbId: "1",
                messageTime: "12:00",
                messageContext: "aGVubG8=",
                messageDate: "2021-10-10",
            },
            quoteType: {
                quoteDbId: "1",
                quoteClientId: null,
                quoteMessageContext: null,
                quoteTime: null,
                quoteDate: null,
            },
            reactionType: [],
        };

        const messagePayloadValidation = MessagePayloadSchema.safeParse(messagePayload);

        expect(messagePayloadValidation.success).toBe(true);
    });

     test("parse failing payload", () => {

         // const payload = `{"payloadType":4,"messageList":[{"messageType":{"messageDbId":"id-1723795499536-1mhfgjp","deleted":false,"edited":false,"messageContext":"d3Rm","messageTime":"10:04","messageDate":"Fri Aug 16 2024"},"quoteType":{"quoteDbId":"id-1723795499536-1mhfgjp","quoteClientId":null,"quoteMessageContext":null,"quoteTime":null,"quoteDate":null},"reactionType":[],"clientType":{"clientDbId":"0dd89226-59ee-4479-958c-87f8ff427f70"},"imageType":{"imageDbId":"id-1723795499536-1mhfgjp","data":null,"type":null}},{"messageType":{"messageDbId":"id-1723822984597-m5zd625","deleted":false,"edited":false,"messageContext":"dGVzdCAxMjM=","messageTime":"17:43","messageDate":"Fri Aug 16 2024"},"quoteType":{"quoteDbId":"id-1723822984597-m5zd625","quoteClientId":null,"quoteMessageContext":null,"quoteTime":null,"quoteDate":null},"reactionType":[],"clientType":{"clientDbId":"0dd89226-59ee-4479-958c-87f8ff427f70"},"imageType":{"imageDbId":"id-1723822984597-m5zd625","data":null,"type":null}},{"messageType":{"messageDbId":"id-1723897254250-b48u2jx","deleted":false,"edited":false,"messageContext":"d2hhdA==","messageTime":"14:20","messageDate":"Sat Aug 17 2024"},"quoteType":{"quoteDbId":"id-1723897254250-b48u2jx","quoteClientId":null,"quoteMessageContext":null,"quoteTime":null,"quoteDate":null},"reactionType":[],"clientType":{"clientDbId":"0dd89226-59ee-4479-958c-87f8ff427f70"},"imageType":{"imageDbId":"id-1723897254250-b48u2jx","data":null,"type":null}},{"messageType":{"messageDbId":"id-1723897261296-dif8nyw","deleted":false,"edited":false,"messageContext":"d3Rm","messageTime":"14:21","messageDate":"Sat Aug 17 2024"},"quoteType":{"quoteDbId":"id-1723897261296-dif8nyw","quoteClientId":null,"quoteMessageContext":null,"quoteTime":null,"quoteDate":null},"reactionType":[],"clientType":{"clientDbId":"0dd89226-59ee-4479-958c-87f8ff427f70"},"imageType":{"imageDbId":"id-1723897261296-dif8nyw","data":null,"type":null}}]}`
         const payload = `{"payloadType":4,"messageList":[
         {"messageType":
         {"messageDbId":"id-1723795499536-1mhfgjp","deleted":false,"edited":false,"messageContext":"d3Rm","messageTime":"10:04","messageDate":"Fri Aug 16 2024"},
         "quoteType":{"quoteDbId":"id-1723795499536-1mhfgjp","quoteClientId":null,"quoteMessageContext":null,"quoteTime":null,"quoteDate":null},
         "reactionType":[],
         "clientType":{"clientDbId":"0dd89226-59ee-4479-958c-87f8ff427f70"},
         "imageType":{"imageDbId":"id-1723795499536-1mhfgjp","data":null,"type":null}}
         ]}`

         const parsedPayload = JSON.parse(payload);
         const validation = MessageListPayloadSchema.safeParse(parsedPayload)

         expect(validation.success).toBe(true);
    });


    test("parsing message list payload", () => {

        const messagePayload: MessagePayload = {
            payloadType: PayloadSubTypeEnum.enum.message,
            clientType: {
                clientDbId: "1",
            },
            messageType: {
                deleted: false,
                edited: false,
                messageDbId: "1",
                messageTime: "12:00",
                messageContext: "aGVubG8=",
                messageDate: "2021-10-10",
            },
            reactionType: [],
        };

        const messageListPayload: MessageListPayload = {
            payloadType: PayloadSubTypeEnum.enum.messageList,
            messageList: [messagePayload],
        };

        const messageListPayloadValidation = MessageListPayloadSchema.safeParse(messageListPayload);

        expect(messageListPayloadValidation.success).toBe(true);
    });
});