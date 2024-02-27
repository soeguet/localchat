import React, {useEffect, useRef, useState} from "react";
import useFontSizeStore from "../stores/fontSizeStore";
import {useTranslation} from "react-i18next";
import FontSize from "./svgs/font/FontSize";

const FontSizePopup = () => {
    const {t} = useTranslation();

    const {fontSize, setFontSize} = useFontSizeStore();
    const [showPopup, setShowPopup] = useState(false);
    const fontSizeRef = useRef<HTMLDivElement>(null);
    /**
     * Handles the click outside the menu.
     * @param event - The mouse event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
        if (fontSizeRef.current && !fontSizeRef.current.contains(event.target as Node)) {
            const {left, top, right, bottom} = fontSizeRef.current.getBoundingClientRect();
            const {clientX, clientY} = event;

            if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
                setShowPopup(false);
            }
        }
    };

    useEffect(() => {
        localStorage.setItem("fontSize", fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopup]);

    return (
        <>
            <div>
                <button
                    onClick={() => setShowPopup(true)}
                    className="hover:bg-gray-500 text-white py-1 px-2 rounded "
                >
                    <FontSize />
                </button>
            </div>
            {showPopup && (
                <div ref={fontSizeRef}
                        className="absolute top-24 right-10 bg-white p-4 border-2 shadow-xl -mt-2 rounded-lg z-20 py-1">
                    <div className="grid grid-rows-2 gap-4 text-black">
                        <div className="flex justify-between items-center">
                            <h2>{t("adjust_font_size")}</h2>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <button
                                onClick={() => setFontSize(fontSize - 1 < 12 ? 12 : fontSize - 1)}
                                className="bg-gray-200 text-lg px-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                -
                            </button>
                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="cursor-pointer w-full"
                            />
                            <button
                                onClick={() => setFontSize(fontSize + 1 > 24 ? 24 : fontSize + 1)}
                                className="bg-gray-200 text-lg px-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                +
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-gray-200 rounded-full px-3 ml-3 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <span className="sr-only">Close</span>
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