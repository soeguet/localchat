import {WindowReload} from "../../../../../../wailsjs/runtime";
import {ReloadIconSvg} from "../../../../../svgs/icons/ReloadIconSvg";
import {useTranslation} from "react-i18next";

function ReloadButton() {
    const { t } = useTranslation();
    return (
        <>
            <button
                type="button"
                className="group flex w-full items-center gap-2 border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                onClick={() => WindowReload()}>
                <div className="group-hover:animate-spin">
                    <ReloadIconSvg />
                </div>
                {t("menu_item_reload")}
            </button>
        </>
    );
}

export { ReloadButton };