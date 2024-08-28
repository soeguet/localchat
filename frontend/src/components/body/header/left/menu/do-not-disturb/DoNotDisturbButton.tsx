import {useDoNotDisturbStore} from "../../../../../../stores/doNotDisturbStore";
import {DoNotDisturbIconSvg} from "../../../../../svgs/icons/DoNotDisturbIconSvg";
import {useTranslation} from "react-i18next";

function DoNotDisturbButton() {
    const { t } = useTranslation();
    const setDoNotDisturb = useDoNotDisturbStore(
        (state) => state.setDoNotDisturb,
    );

    return (
        <>
            <button
                type="button"
                className="group flex w-full items-center gap-2 border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                onClick={() =>
                    setDoNotDisturb(
                        !useDoNotDisturbStore.getState().doNotDisturb,
                    )
                }>
                <div className="group-hover:animate-bounce">
                    <DoNotDisturbIconSvg />
                </div>
                {t("menu_item_do_not_disturb")}
            </button>
        </>
    );
}

export { DoNotDisturbButton };