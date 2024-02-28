import { useState } from "react";
import { WindowReloadApp } from "../../../wailsjs/runtime/runtime";
import { useTranslation } from "react-i18next";

function ClientNotFoundPage() {
    const { t } = useTranslation();
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
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="text-lg font-semibold text-gray-800 mb-4">{t("client_not_found")}</div>
                <button
                    onClick={() => WindowReloadApp()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:border-black"
                    disabled={!disableClickable}
                >
                    {t("button_reconnect")}
                </button>
            </div>
        </>
    );
}

export default ClientNotFoundPage;
