import { useEffect, useRef, useState } from "react";
import { WindowReload } from "../../../../../wailsjs/runtime";
import { useTranslation } from "react-i18next";
import ForceModal from "../ForceModal";
import useDoNotDisturbStore from "../../../../stores/doNotDisturbStore";
import ProfileModal from "./ProfileModal";
import InfoMenuButton from "./InfoMenuButton";

type ProfileMenuPropsType = {
    showMenu: boolean;
    setShowMenu: (show: boolean) => void;
};

function ProfileMenu(props: ProfileMenuPropsType) {
    const { t } = useTranslation();
    const menuRef = useRef<HTMLDivElement>(null);
    const setDoNotDisturb = useDoNotDisturbStore(
        (state) => state.setDoNotDisturb
    );
    const [showProfileModal, setShowProfileModal] = useState(false);

    /**
     * Handles the click outside the menu.
     * @param event - The mouse event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            const { left, top, right, bottom } =
                menuRef.current.getBoundingClientRect();
            const { clientX, clientY } = event;

            if (
                clientX < left ||
                clientX > right ||
                clientY < top ||
                clientY > bottom
            ) {
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
            {props.showMenu && (
                <div
                    ref={menuRef}
                    className={
                        "absolute left-2 top-20 z-20 mr-12 mt-2 w-56 rounded-md border-2 bg-white py-1 shadow-xl"
                    }
                >
                    <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                        onClick={() => {
                            setShowProfileModal(true);
                            props.setShowMenu(false);
                        }}
                    >
                        {t("menu_item_profile")}
                    </button>

                    <InfoMenuButton />

                    <button
                        className="block w-full border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                        onClick={() =>
                            setDoNotDisturb(
                                !useDoNotDisturbStore.getState().doNotDisturb
                            )
                        }
                    >
                        {t("menu_item_do_not_disturb")}
                    </button>

                    <ForceModal />

                    <button
                        className="block w-full border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                        onClick={() => WindowReload()}
                    >
                        {t("menu_item_reload")}
                    </button>
                </div>
            )}
            {showProfileModal && (
                <ProfileModal
                    isOpen={showProfileModal}
                    setIsOpen={setShowProfileModal}
                />
            )}
        </>
    );
}

export default ProfileMenu;
