import React, {useEffect} from "react";
import {handleClickOutsideOfDiv} from "../../../../../../utils/gui/handleClickOutsideOfDiv";

function useHandleClickOutsideOfMenuDiv(menuRef: React.RefObject<HTMLDivElement>, menuState: any) {
    useEffect(() => {
        if (menuState.menuOpen) {
            document.addEventListener("mousedown", (e) =>
                handleClickOutsideOfDiv(menuRef, e, menuState.setMenuOpen),
            );
        }

        return () => {
            document.removeEventListener("mousedown", (e) =>
                handleClickOutsideOfDiv(menuRef, e, menuState.setMenuOpen),
            );
        };
    }, [menuState.menuOpen]);
}

export { useHandleClickOutsideOfMenuDiv };