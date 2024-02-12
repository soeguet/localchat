import { create } from "zustand";

export type Reply = {
    id: string;
    username: string;
    time: string;
    message: string;
};

export type ReplyStore = {
    replyTo: Reply | null;
    setReplyTo: (reply: Reply) => void;
};

const useReplyStore = create<ReplyStore>((set) => ({
    replyTo: null,
    setReplyTo: (reply: Reply) => set(() => ({ replyTo: reply })),
}));

export default useReplyStore;
