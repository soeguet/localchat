import {useEffect, useRef} from "react";
import {WindowReload} from "../../wailsjs/runtime/runtime";
import {useTranslation} from "react-i18next";
import ForceModal from "./ForceModal";

type ProfileMenuPropsType = {
    showMenu: boolean;
    setShowMenu: (show: boolean) => void;
    setShowProfileModal: (show: boolean) => void;
};

function ProfileMenu(props: ProfileMenuPropsType) {
    const {t} = useTranslation();
    const menuRef = useRef<HTMLDivElement>(null);

    /**
     * Handles the click outside of the menu.
     * @param event - The mouse event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            const {left, top, right, bottom} = menuRef.current.getBoundingClientRect();
            const {clientX, clientY} = event;

            if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
                props.setShowMenu(false);
            }
        }
    };

    useEffect(() => {
        if (props.showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props.showMenu]);

    return (
        <>
            <div
                ref={menuRef}
                className={"absolute left-2 top-16 mr-12 z-20 mt-2 w-56 rounded-md border-2 bg-white py-1 shadow-xl"}
            >
                <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                        props.setShowProfileModal(true);
                        props.setShowMenu(false);
                    }}
                >
                    {t("menu_item_profile")}
                </button>
                <ForceModal/>

                <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => WindowReload()}
                >
                    {t("menu_item_reload")}
                </button>
            </div>
        </>
    );
}

export default ProfileMenu;