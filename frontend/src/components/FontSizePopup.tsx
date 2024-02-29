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
                    className="rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500"
                >
                    <FontSize />
                </button>
            </div>
            {showPopup && (
                <div ref={fontSizeRef}
                        className="absolute top-24 right-10 z-20 -mt-2 rounded-lg border-2 bg-white p-4 py-1 shadow-xl">
                    <div className="grid grid-rows-2 gap-4 text-black">
                        <div className="flex items-center justify-between">
                            <h2>{t("adjust_font_size")}</h2>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <button
                                onClick={() => setFontSize(fontSize - 1 < 12 ? 12 : fontSize - 1)}
                                className="rounded bg-gray-200 px-2 text-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                -
                            </button>
                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full cursor-pointer"
                            />
                            <button
                                onClick={() => setFontSize(fontSize + 1 > 24 ? 24 : fontSize + 1)}
                                className="rounded bg-gray-200 px-2 text-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                +
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="ml-3 rounded-full bg-gray-200 px-3 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
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