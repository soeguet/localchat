import { create, type StoreApi, type UseBoundStore } from "zustand";

/**
 * Represents a reply in the chat.
 */
export type Reply = {
	id: string;
	senderId: string;
	username: string;
	time: string;
	date: string;
	message: string;
};

/**
 * Represents the ReplyStore object.
 */
export type ReplyStore = {
	replyMessage: Reply | null;
	setReplyMessage: (reply: Reply | null) => void;
};

/**
 * Custom hooks for managing the reply store.
 * @returns An object containing the replyMessage state and a function to set the replyMessage value.
 */
const useReplyStore: UseBoundStore<StoreApi<ReplyStore>> = create<ReplyStore>(
	(set) => ({
		replyMessage: null,
		setReplyMessage: (replyMessage) =>
			set(() => ({ replyMessage: replyMessage })),
	}),
);

export { useReplyStore };
