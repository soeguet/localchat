import {useState} from "react";
import {WindowReloadApp} from "../../../wailsjs/runtime";
import {useTranslation} from "react-i18next";

function ClientNotFoundPage() {
    const {t} = useTranslation();
    const [disableClickable, setDisableClickable] = useState(false);
    const timeout = setTimeout(() => {
        setDisableClickable(true);

        return () => {
            clearTimeout(timeout);
            setDisableClickable(false);
        };
    }, 2000);

    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
                <div className="mb-4 text-lg font-semibold text-gray-800">
                    {t("client_not_found")}
                </div>
                <button
                    onClick={() => WindowReloadApp()}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:border-black"
                    disabled={!disableClickable}
                >
                    {t("button_reconnect")}
                </button>
            </div>
        </>
    );
}

export {ClientNotFoundPage};