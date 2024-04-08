import {handleClickOutsideOfDiv} from "../../utils/handleClickOutsideOfDiv";
import {RefObject, useEffect} from "react";

function useClosePopupOnClickEffect(
    open: boolean,
    setOpen: (open: boolean) => void,
    ref: RefObject<HTMLDivElement>
) {
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", (event) =>
                handleClickOutsideOfDiv(ref, event, setOpen)
            );
        }

        return () => {
            document.removeEventListener("mousedown", (event) =>
                handleClickOutsideOfDiv(ref, event, setOpen)
            );
        };
    }, [open, setOpen]);
}

export {useClosePopupOnClickEffect};