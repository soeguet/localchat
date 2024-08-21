import { describe, expect, test } from "vitest";
import { ChatBubbleMenu } from "./ChatBubbleMenu";
import { render, screen } from "../../../../utils/tests/test-utils";
import {PayloadSubTypeEnum} from "../../../../utils/types/customTypes";

describe("ChatBubbleMenu", () => {
	test("should not render menu", () => {
		render(
			<ChatBubbleMenu
				messagePayload={{
					payloadType: PayloadSubTypeEnum.enum.message,
					clientType: {
						clientDbId: "1",
					},
					messageType: {
						messageDbId: "1",
						messageTime: "10:00",
						messageContext: "Hello, world!",
						deleted: false,
						edited: false,
						messageDate: "2021-06-02",
					},
				}}
				setEnableMessageEditingMode={() => {}}
				showMenu={false}
				setShowMenu={() => {}}
				activateReplyMessage={() => {}}
				thisMessageFromThisClient={true}
			/>,
		);
		expect(screen.queryByTestId("chat-bubble-menu")).not.toBeInTheDocument();
	});
	test("should render menu", () => {
		render(
			<ChatBubbleMenu
				messagePayload={{
					payloadType: PayloadSubTypeEnum.enum.message,
					clientType: {
						clientDbId: "1",
					},
					messageType: {
						messageDbId: "1",
						messageTime: "10:00",
						messageContext: "Hello, world!",
						deleted: false,
						edited: false,
						messageDate: "2021-06-02",
					},
				}}
				showMenu={true}
				setShowMenu={() => {}}
				setEnableMessageEditingMode={() => {}}
				activateReplyMessage={() => {}}
				thisMessageFromThisClient={true}
			/>,
		);
		expect(screen.getByTestId("chat-bubble-menu")).toBeInTheDocument();
	});
});