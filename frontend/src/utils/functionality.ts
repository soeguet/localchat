/**
 * Scrolls to the bottom of the list.
 * @returns A promise that resolves once the scrolling is complete.
 */
export async function scrollToBottom(reference: React.MutableRefObject<HTMLDivElement | null>): Promise<void> {
    reference.current?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Generates a simple unique ID.
 * The ID is a combination of the current timestamp and a random string.
 *
 * @returns The generated unique ID.
 */
export function generateSimpleId() {
    return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
