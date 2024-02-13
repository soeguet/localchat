import { create } from "zustand";

/**
 * Represents a reply in the chat.
 */
export type Reply = {
    id: string;
    username: string;
    time: string;
    message: string;
};

/**
 * Represents the ReplyStore object.
 */
export type ReplyStore = {
    replyTo: Reply | null;
    setReplyTo: (reply: Reply | null) => void;
};

/**
 * Custom hook for managing the reply store.
 * @returns An object containing the replyTo state and a function to set the replyTo value.
 */
const useReplyStore = create<ReplyStore>((set) => ({
    replyTo: null,
    setReplyTo: (replyTo) => set(() => ({ replyTo: replyTo })),
}));

export default useReplyStore;
