import { useEffect, useRef } from "react";
import useFontSizeStore from "../../../../../stores/fontSizeStore";
import { useTranslation } from "react-i18next";
import FontSizeAdjustButton from "./elements/FontSizeAdjustButton";
import { handleClickOutsideOfDiv } from "../../../../../utils/handleClickOutsideOfDiv";

type FontSizePopupProps = {
    showPopup: boolean;
    setShowPopup: (show: boolean) => void;
};

const FontSizePopup = (props: FontSizePopupProps) => {
    const { t } = useTranslation();
    const { fontSize, setFontSize } = useFontSizeStore();
    const fontSizeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        localStorage.setItem("fontSize", fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        if (props.showPopup) {
            document.addEventListener("mousedown", (event) =>
                handleClickOutsideOfDiv(fontSizeRef, event, props.setShowPopup)
            );
        }

        return () => {
            document.removeEventListener("mousedown", (event) =>
                handleClickOutsideOfDiv(fontSizeRef, event, props.setShowPopup)
            );
        };
    }, [props.showPopup, props.setShowPopup]);

    return (
        <>
            {props.showPopup && (
                <div
                    ref={fontSizeRef}
                    className="absolute right-10 top-24 z-20 -mt-2 rounded-lg border-2 bg-white p-4 py-1 shadow-xl"
                >
                    <div className="grid grid-rows-2 gap-4 text-black">
                        <div className="flex items-center justify-between">
                            <h2>{t("adjust_font_size")} - {fontSize}</h2>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <FontSizeAdjustButton
                                onClick={() =>
                                    setFontSize(
                                        fontSize - 1 < 12 ? 12 : fontSize - 1
                                    )
                                }
                            >
                                -
                            </FontSizeAdjustButton>

                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={fontSize}
                                onChange={(e) =>
                                    setFontSize(Number(e.target.value))
                                }
                                className="w-full cursor-pointer"
                            />

                            <FontSizeAdjustButton
                                onClick={() =>
                                    setFontSize(
                                        fontSize + 1 > 24 ? 24 : fontSize + 1
                                    )
                                }
                            >
                                +
                            </FontSizeAdjustButton>

                            <button
                                onClick={() => props.setShowPopup(false)}
                                className="ml-3 rounded-full bg-gray-200 px-3 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                🗙
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FontSizePopup;