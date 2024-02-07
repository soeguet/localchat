/**
 * Scrolls to the bottom of the list.
 * @returns A promise that resolves once the scrolling is complete.
 */
export async function scrollToBottom(reference:React.MutableRefObject<HTMLDivElement | null>): Promise<void> {
    reference.current?.scrollIntoView({ behavior: "smooth" });
}
