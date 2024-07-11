import { create } from "zustand";

type TypingStoreType = {
	typingClientIds: string[];
	addTypingClientId: (clientDbId: string) => void;
	removeTypingClientId: (clientDbId: string) => void;
};

const useTypingStore = create<TypingStoreType>((set) => ({
	typingClientIds: [],
	addTypingClientId: (clientDbId: string) =>
		set((state) => ({
			typingClientIds: state.typingClientIds.includes(clientDbId)
				? state.typingClientIds
				: [...state.typingClientIds, clientDbId],
		})),
	removeTypingClientId: (clientDbId: string) =>
		set((state) => ({
			typingClientIds: state.typingClientIds.filter((id) => id !== clientDbId),
		})),
}));

export { useTypingStore };
