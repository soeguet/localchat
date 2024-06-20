import { useRefStore } from "../stores/refStore";

export async function scrollToBottom(): Promise<void> {
	const chatBottomRef = useRefStore.getState().chatBottomRef;
	chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Generates a simple unique ID.
 * The ID is a combination of the current timestamp and a random string.
 * Output: id-1718910967920-xz9wa7c
 *
 * @returns The generated unique ID.
 */
export function generateSimpleId() {
	return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
