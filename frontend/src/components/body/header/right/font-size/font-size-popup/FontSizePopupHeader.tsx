import { useTranslation } from "react-i18next";

type FontSizePopupHeaderProps = {
    fontSize: number;
};
function FontSizePopupHeader(props: FontSizePopupHeaderProps) {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex items-center justify-between">
                <h2>
                    {t("adjust_font_size")} - {props.fontSize}
                </h2>
            </div>
        </>
    );
}

export { FontSizePopupHeader };