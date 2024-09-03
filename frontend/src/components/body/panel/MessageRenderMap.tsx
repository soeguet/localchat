import { Fragment, useDeferredValue, useEffect } from "react";
import { useMessageMapStore } from "../../../stores/messageMapStore";
import { useUnseenMessageCountStore } from "../../../stores/unseenMessageCountStore";
import { useUserStore } from "../../../stores/userStore";
import {
	checkIfScrollToBottomIsNeeded,
	scrollToBottom,
} from "../../../utils/gui/scrollToBottomNeeded";
import type { MessagePayload } from "../../../utils/types/customTypes";
import { DeletedMessage } from "./messages/deleted/DeletedMessage";
import { ChatMessageUnit } from "./messages/inner/ChatMessageUnit";
import { UnreadMessagesBelowBanner } from "./messages/unread/UnreadMessagesBelowBanner";

function MessageRenderMap() {
	const messageMap = useMessageMapStore((state) => state.messageMap);
	const thisClientId = useUserStore.getState().myId;
	const newMap = useDeferredValue(messageMap);
	const idOfTheFirstUnreadMessage = useUnseenMessageCountStore(
		(state) => state.unseenMessagesIdList[0],
	);

	useEffect(() => {
		// get the last message from newMap
		if (newMap.size === 0) return;

		const lastMessage = Array.from(newMap.entries())[newMap.size - 1];

		if (lastMessage[1].clientType.clientDbId === undefined) {
			return;
		}

		checkIfScrollToBottomIsNeeded(
			lastMessage[1].clientType.clientDbId,
		).then((scrollToBottomIsNeeded) => {
			if (scrollToBottomIsNeeded) {
				scrollToBottom().then(() => {
					useUnseenMessageCountStore
						.getState()
						.resetUnseenMessageCount();
				});
			} else {
				useUnseenMessageCountStore
					.getState()
					.incrementUnseenMessageCount();
			}
		});
	}, [newMap]);

	return (
		<>
			{newMap.size > 0 &&
				Array.from(newMap.entries()).map((value, index, array) => {
					let lastMessageFromThisClientId = false;
					let lastMessageTimestampSameAsThisOne = false;
					const thisMessageFromThisClient =
						value[1].clientType.clientDbId === thisClientId;

					const thisIsTheFirstUnreadMessage =
						value[1].messageType.messageDbId ===
						idOfTheFirstUnreadMessage;

					if (array.length > 1 && index > 0) {
						const lastMessage: [string, MessagePayload] =
							array[index - 1];
						if (
							// skip if message was deleted
							!lastMessage[1].messageType.deleted &&
							lastMessage[1].clientType.clientDbId !==
								undefined &&
							lastMessage[1].clientType.clientDbId ===
								value[1].clientType.clientDbId
						) {
							lastMessageFromThisClientId = true;
						}
						if (
							lastMessage[1].messageType.messageTime ===
							value[1].messageType.messageTime
						) {
							lastMessageTimestampSameAsThisOne = true;
						}
					}

					return (
						<Fragment key={value[0]}>
							<UnreadMessagesBelowBanner
								thisIsTheFirstUnreadMessage={
									thisIsTheFirstUnreadMessage
								}
							/>

							{value[1].messageType.deleted ? (
								<DeletedMessage
									clientDbId={value[1].clientType.clientDbId}
									thisMessageFromThisClient={
										thisMessageFromThisClient
									}
								/>
							) : (
								<ChatMessageUnit
									messagePayload={value[1]}
									lastMessageFromThisClientId={
										lastMessageFromThisClientId
									}
									lastMessageTimestampSameAsThisOne={
										lastMessageTimestampSameAsThisOne
									}
									thisMessageFromThisClient={
										thisMessageFromThisClient
									}
								/>
							)}
						</Fragment>
					);
				})}
		</>
	);
}

export { MessageRenderMap };