export const isVisibleInViewport = (
    el: HTMLElement,
    parentEl: HTMLElement,
    partiallyVisible = false
): boolean => {
    const rect = el.getBoundingClientRect();
    const parentRect = parentEl.getBoundingClientRect();

    const completelyVisible =
        rect.top >= parentRect.top &&
        rect.left >= parentRect.left &&
        rect.bottom <= parentRect.bottom &&
        rect.right <= parentRect.right;

    const partiallyVisibleCondition =
        partiallyVisible &&
        ((rect.top < parentRect.bottom && rect.bottom > parentRect.top) ||
            (rect.bottom > parentRect.top && rect.top < parentRect.bottom));

    return completelyVisible || partiallyVisibleCondition;
};
