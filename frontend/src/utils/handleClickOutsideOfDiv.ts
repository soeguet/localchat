import type React from "react";

export const handleClickOutsideOfDiv = (
    ref: React.RefObject<HTMLDivElement>,
    event: MouseEvent,
    modalSetter: (show: boolean) => void
) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
        const {left, top, right, bottom} =
            ref.current.getBoundingClientRect();
        const {clientX, clientY} = event;

        if (
            clientX < left ||
            clientX > right ||
            clientY < top ||
            clientY > bottom
        ) {
            modalSetter(false);
        }
    }
};