import { expect, test, describe } from "vitest";
import { useMessageMapStore } from "../../../stores/messageMapStore";
import { useUserStore } from "../../../stores/userStore";
import {
	type MessagePayload,
	PayloadSubTypeEnum,
} from "../../../utils/customTypes";
import { ChatPanel } from "./ChatPanel";
import { render, screen, waitFor } from "../../../utils/test-utils";
import { useClientStore } from "../../../stores/clientStore";

describe("QuoteBubble", () => {
	test("render quote bubble for this client", async () => {
		const id = "111";
		const messagePayload: MessagePayload = {
			payloadType: PayloadSubTypeEnum.enum.message,
			clientType: {
				clientDbId: id,
			},
			messageType: {
				deleted: false,

				messageDate: "2021-10-10",
				messageTime: "12:00",
				messageContext: "aGVubG8=",
				messageDbId: "111",
				edited: false,
			},
			quoteType: {
				quoteMessageContext: "aGVubG8=",
				quoteTime: "12:00",
				quoteDate: "2021-10-10",
				quoteDbId: "111",
				quoteClientId: "111",
			},
			reactionType: [],
		};

		useMessageMapStore.getState().onMessage(messagePayload);
		useUserStore.getState().setMyId(id);
		useUserStore.getState().setMyUsername("TestUser");
		render(<ChatPanel />);
		const container = await screen.findByTestId("quote-bubble");
		expect(container).toBeInTheDocument();
	});

	test("render quote bubble for all clients and verify both usernames in the dom", async () => {
		const id = "111";
		const otherId = "222";
		const messagePayload: MessagePayload = {
			payloadType: PayloadSubTypeEnum.enum.message,
			clientType: {
				clientDbId: id,
			},
			messageType: {
				deleted: false,

				messageDate: "2021-10-10",
				messageTime: "12:00",
				messageContext: "aGVubG8=",
				messageDbId: "111",
				edited: false,
			},
			quoteType: {
				quoteMessageContext: "aGVubG8=",
				quoteTime: "12:00",
				quoteDate: "2021-10-10",
				quoteDbId: "222",
				quoteClientId: "111",
			},
			reactionType: [],
		};
		const messagePayload2: MessagePayload = {
			payloadType: PayloadSubTypeEnum.enum.message,
			clientType: {
				clientDbId: otherId,
			},
			messageType: {
				deleted: false,

				messageDate: "2021-10-10",
				messageTime: "12:00",
				messageContext: "aGVubG8=",
				messageDbId: "222",
				edited: false,
			},
			quoteType: {
				quoteMessageContext: "aGVubG8=",
				quoteTime: "12:00",
				quoteDate: "2021-10-10",
				quoteDbId: "111",
				quoteClientId: "222",
			},
			reactionType: [],
		};

		useMessageMapStore.getState().onMessage(messagePayload);
		useMessageMapStore.getState().onMessage(messagePayload2);
		useUserStore.getState().setMyId(id);
		useUserStore.getState().setMyUsername("TestUser");
		useClientStore.getState().setClients([
			{
				clientDbId: id,
				clientUsername: "TestUser",
				availability: true,
			},
			{
				clientDbId: otherId,
				clientUsername: "TestUser2",
				availability: true,
			},
		]);

		render(<ChatPanel />);
		await waitFor(async () => {
			const container = await screen.findAllByTestId("quote-bubble");
			expect(container.length).toBe(2);
			const testUser1 = await screen.findByText("TestUser");
			expect(testUser1).toBeInTheDocument();
			const testUser2 = await screen.findByText("TestUser2");
			expect(testUser2).toBeInTheDocument();
		});
	});
});

// import { useClientStore } from "../../../stores/clientStore";
// import { useFontSizeStore } from "../../../stores/fontSizeStore";
// import type { MessagePayload } from "../../../utils/customTypes";
// import { LinkifiedText } from "./LinkifiedText";
// import { base64ToUtf8 } from "../../../utils/encoder";
//
// type QuoteBubbleProps = {
//     payload: MessagePayload;
// };
//
// function QuoteBubble(props: QuoteBubbleProps) {
//     if (props.payload === undefined || props.payload.quoteType === null) {
//         return null;
//     }
//
//     const fontSize = useFontSizeStore((state) => state.fontSize);
//
//     const quotedClientName = useClientStore
//         .getState()
//         .clients.find(
//             (c) => c.clientDbId === props.payload.clientType.clientDbId
//         )?.clientUsername;
//
//     if (
//         props.payload.quoteType === undefined ||
//         !props.payload.quoteType.quoteMessageContext
//     ) {
//         return;
//     }
//
//     const base64DecodedQuoteMessage = base64ToUtf8(
//         props.payload.quoteType.quoteMessageContext
//     );
//
//     return (
//         <>
//             {props.payload.quoteType && (
//                 <div
//                     className="my-1 rounded-md border-l-4 border-blue-300 bg-gray-100 bg-opacity-70 p-2"
//                     style={{
//                         fontSize: `${fontSize - 3}px`,
//                     }}
//                 >
//                     <div className="text-gray-800">
//                         {base64DecodedQuoteMessage}
//                         {/* <LinkifiedText
//                             text={props.payload.quoteType.quoteMessageContext}
//                         /> */}
//                     </div>
//                     <div className="mt-2 text-gray-500">
//                         — {quotedClientName},{" "}
//                         {props.payload.quoteType.quoteTime}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
//
// export { QuoteBubble };