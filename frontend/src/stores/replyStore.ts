import { create } from "zustand";

export type Reply = {
    id: string;
    username: string;
    time: string;
    message: string;
};

export type ReplyStore = {
    replyTo: Reply | null;
    setReplyTo: (reply: Reply | null) => void;
};

const useReplyStore = create<ReplyStore>((set) => ({
    replyTo: null,
    setReplyTo: (replyTo) => set(() => ({ replyTo: replyTo })),
}));

export default useReplyStore;
