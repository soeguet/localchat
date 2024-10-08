import {type FormEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {useUserStore} from "../../stores/userStore";
import {errorLogger} from "../../logger/errorLogger";
import {checkIfIpIsValid, checkIfPortIsValid, checkIfPortOutOfBounds} from "../../utils/env/envValidation";

function Form() {

    // state
    const {t} = useTranslation();
    const [isClickable, setIsClickable] = useState(true);
    const [localClientName, setLocalClientName] = useState("");
    const [localSocketIp, setLocalSocketIp] = useState(
        useUserStore.getState().socketIp,
    );
    const [localSocketPort, setLocalSocketPort] = useState(
        useUserStore.getState().socketPort,
    );
    // state

    const validateStateVariables = () => {

        const ipIsValid = checkIfIpIsValid(localSocketIp);
        if (!ipIsValid){
            setLocalSocketIp("");
        }

        const portIsValid = checkIfPortIsValid(localSocketPort);
        if (!portIsValid){
            setLocalSocketPort("");
        }

        const portOutOfBounds = checkIfPortOutOfBounds(localSocketPort);
        if (portOutOfBounds){
            setLocalSocketPort("");
        }

        return ipIsValid && portIsValid && !portOutOfBounds;
    };

    const checkIfStateVariablesAreEmpty = () => {
        return localClientName === "" ||
            localSocketIp === "" ||
            localSocketPort === ""
    };

    /**
     * Saves the environment variables.
     * @param e - The form event.
     */
    const saveEnvVars = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsClickable(false);
        setTimeout(() => {
            setIsClickable(true);
        }, 1000);

        if (checkIfStateVariablesAreEmpty()) {
            errorLogger.logError(new Error("Empty state variables"));
            return;
        }
        if (!validateStateVariables()) {
            errorLogger.logError(new Error("Invalid state variables"));
            return;
        }

        // set the environment variables
        useUserStore.getState().setMyUsername(localClientName || "");
        useUserStore.getState().setSocketIp(localSocketIp);
        useUserStore.getState().setSocketPort(localSocketPort);
    };

    return (
        <>
            <div className="m-20 overflow-hidden rounded-lg bg-gray-100 shadow">
                <div className="p-10">
                    <div className="space-y-4">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                {t("missing_env_vars")}
                            </h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="client-name"
                                        className="block text-sm font-medium leading-6 text-gray-900">
                                        <i>{t("client_name")}</i>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={localClientName}
                                            name="client-name"
                                            placeholder={t(
                                                "client_name_placeholder",
                                            )}
                                            onChange={(e) =>
                                                setLocalClientName(
                                                    e.target.value,
                                                )
                                            }
                                            className="block
                                            w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:bg-blue-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="socket-ip"
                                        className="block text-sm font-medium leading-6 text-gray-900">
                                        <i>{t("socket_ip")}</i>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={localSocketIp}
                                            name="socket-ip"
                                            placeholder="e.g. 127.0.0.1"
                                            onChange={(e) =>
                                                setLocalSocketIp(e.target.value)
                                            }
                                            className="block
                                            w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:bg-blue-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="socket-port"
                                        className="block text-sm font-medium leading-6 text-gray-900">
                                        <i>{t("socket_port")}</i>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={localSocketPort}
                                            name="socket-port"
                                            placeholder="e.g. 8080"
                                            onChange={(e) =>
                                                setLocalSocketPort(
                                                    e.target.value,
                                                )
                                            }
                                            className="block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:bg-blue-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900">
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            onClick={saveEnvVars}
                            className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${!isClickable ? "cursor-not-allowed bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-500"} text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                            {isClickable
                                ? t("save_env_vars")
                                : t("saving_env_vars")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export {Form};
