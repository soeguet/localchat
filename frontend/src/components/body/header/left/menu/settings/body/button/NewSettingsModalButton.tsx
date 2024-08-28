import {SettingsIconSvg} from "../../../../../../../svgs/icons/SettingsIconSvg";
import {useTranslation} from "react-i18next";

type NewSettingsModalButtonProps = {
    menuIsOpened: (isOpened: boolean) => void;
};

function NewSettingsModalButton(props:NewSettingsModalButtonProps) {
    const {t} = useTranslation();
    return (
        <button
            type="button"
            data-testid="settings-menu-button"
            className="group flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
            onClick={() => {
                props.menuIsOpened(true);
            }}>
            <div className="group-hover:animate-bounce">
                <SettingsIconSvg />
            </div>
            {t("menu_item_profile")}
        </button>

    )
}

export {NewSettingsModalButton};