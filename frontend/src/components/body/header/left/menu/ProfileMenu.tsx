import {useRef} from "react";
import {ForceModal} from "./force/ForceModal";
import {InfoMenuButton} from "./info/InfoMenuButton";
import {NewSettingsModalButton} from "./settings/body/button/NewSettingsModalButton";
import {BannerMenuButton} from "./banner/BannerMenuButton";
import {useMenuStore} from "../../../../../stores/menuStore";
import {DoNotDisturbButton} from "./do-not-disturb/DoNotDisturbButton";
import {ReloadButton} from "./reload/ReloadButton";
import {useSetChatMenuRef} from "./custom-hooks/useSetChatMenuRef";
import {useHandleClickOutsideOfMenuDiv} from "./custom-hooks/useHandleClickOutsideOfMenuDiv";
import {Settings} from "./settings/Settings";

function ProfileMenu() {
    const menuState = useMenuStore()
    const menuRef = useRef<HTMLDivElement>(null);

    useSetChatMenuRef(menuRef);
    useHandleClickOutsideOfMenuDiv(menuRef, menuState);

    return (
        <>
            {menuState.menuOpen && (
                <div
                    ref={menuRef}
                    className={
                        "fixed left-2 top-20 z-30 mr-12 mt-2 w-56 rounded-md border-2 bg-white py-1 shadow-xl"
                    }
                >
                    <Settings />
                    <InfoMenuButton />
                    <BannerMenuButton />
                    <DoNotDisturbButton />
                    <ForceModal />
                    <ReloadButton />
                </div>
            )}
        </>
    );
}

export {ProfileMenu};