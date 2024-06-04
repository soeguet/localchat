import { useTranslation } from "react-i18next";

type FontSizePopupHeaderProps = {
    fontSize: number;
};
function FontSizePopupHeader(props: FontSizePopupHeaderProps) {
    const { t } = useTranslation();
    return (
        <>
            <div className="my-3 flex min-h-16 min-w-64 items-center justify-between border border-gray-400 p-3 shadow shadow-black/50">
                <h2>
                    {t("adjust_font_size")} - {props.fontSize}
                </h2>
            </div>
        </>
    );
}

export { FontSizePopupHeader };

