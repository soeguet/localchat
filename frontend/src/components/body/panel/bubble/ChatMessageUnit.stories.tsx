import { useClientStore } from "../../../../stores/clientStore";
import { StoryFn } from "@storybook/react";
import { ChatMessageUnit } from "./ChatMessageUnit";

export default {
    component: ChatMessageUnit,
    decorators: [
        (Story: StoryFn) => {
            useClientStore.getState().setClients([
                {
                    clientDbId: "AAA",
                    clientUsername: "TestUser",
                    clientColor: "#cd2a1a",
                },
                {
                    clientDbId: "BBB",
                    clientUsername: "TestUser2",
                    clientColor: "#003000",
                },
            ]);

            return <Story />;
        },
    ],
};

export const Default = {
    args: {
        title: "ChatMessageUnit",
        primary: true,
        lastMessageFromThisClientId: false,
        lastMessageTimestampSameAsThisOne: false,
        messagePayload: {
            payloadType: 1,
            messageType: {
                messageDbId: 123,
                messageContext:
                    "SW50ZXJha3RpdmUgRGF0ZW5hbmFseXNlOiBKdXB5dGVyIGVybcO2Z2xpY2h0IGludGVyYWt0aXZlIHVuZCBpdGVyYXRpdmUgRGF0ZW5hbmFseXNlLCBpZGVhbCBmw7xyIERhdGEgU2NpZW5jZSB1bmQgbWFzY2hpbmVsbGVzIExlcm5lbi4gQmVudXR6ZXIga8O2bm5lbiBDb2RlIGluIGtsZWluZW4gQmzDtmNrZW4gKFplbGxlbikgYXVzZsO8aHJlbiB1bmQgc29mb3J0aWdlIEVyZ2Vibmlzc2Ugc2VoZW4u",
                messageTime: "12:45",
                messageDate: "2024-01-01",
            },
            clientType: {
                clientDbId: "BBB",
            },
            quoteType: null,
            reactionType: null,
        },
    },
};

export const OtherClient = {
    args: {
        ...Default.args,
        messagePayload: {
            ...Default.args.messagePayload,
            clientType: {
                clientDbId: "AAA",
            },
        },
        lastMessageFromThisClientId: false,
        lastMessageTimestampSameAsThisOne: false,
        thisMessageFromThisClient: true,
    },
};

export const ThisClient = {
    args: {
        ...Default.args,
        title: "ThisClient - Default",
        label: "this client what is the label even for?",
        messagePayload: {
            ...Default.args.messagePayload,
            clientType: {
                clientDbId: "AAA",
            },
        },
        lastMessageFromThisClientId: false,
        lastMessageTimestampSameAsThisOne: false,
        thisMessageFromThisClient: true,
    },
};
