import { type FormEvent, useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { useTranslation } from "react-i18next";

function Form() {
    const { t } = useTranslation();
    const setClientName = useUserStore((state) => state.setMyUsername);
    const setSocketIp = useUserStore((state) => state.setSocketIp);
    const setSocketPort = useUserStore((state) => state.setSocketPort);

    const clientName = useUserStore((state) => state.myUsername);
    const socketIp = useUserStore((state) => state.socketIp);
    const socketPort = useUserStore((state) => state.socketPort);

    const [isClickable, setIsClickable] = useState(true);
    const [localClientName, setLocalClientName] = useState("");
    const [localSocketIp, setLocalSocketIp] = useState("");
    const [localSocketPort, setLocalSocketPort] = useState("");

    useEffect(() => {
        setLocalClientName(clientName);
        setLocalSocketIp(socketIp);
        setLocalSocketPort(socketPort);
    }, [clientName, socketIp, socketPort]);

    function validateStateVariables() {
        // regex for ip address
        const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        // check if localsocketip is a valid ip address
        if (!ipRegex.test(localSocketIp)) {
            return false;
        }

        // check if localsocketport is a valid port
        if (isNaN(Number.parseInt(localSocketPort))) {
            return false;
        }

        // check if port is smaller than 0 or greater than 65535
        if (
            Number.parseInt(localSocketPort) < 0 ||
            Number.parseInt(localSocketPort) > 65535
        ) {
            return false;
        }

        return true;
    }

    function checkIfStateVariablesAreEmpty() {
        if (
            localClientName === "" ||
            localSocketIp === "" ||
            localSocketPort === ""
        ) {
            return false;
        }

        return true;
    }

    /**
     * Saves the environment variables.
     * @param e - The form event.
     */
    function saveEnvVars(e: FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsClickable(false);

        // validate the state variables
        if (!validateStateVariables()) {
            setIsClickable(true);
            return;
        }

        if (checkIfStateVariablesAreEmpty()) {
            setIsClickable(true);
            return;
        }

        // set the environment variables
        setClientName(localClientName);
        setSocketIp(localSocketIp);
        setSocketPort(localSocketPort);

        setTimeout(() => {
            setIsClickable(true);
        }, 1000);
    }

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
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        <i>{t("client_name")}</i>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={localClientName}
                                            name="client-name"
                                            placeholder={t(
                                                "client_name_placeholder"
                                            )}
                                            onChange={(e) =>
                                                setLocalClientName(
                                                    e.target.value
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
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
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
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
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
                                                    e.target.value
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
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            onClick={(e) => saveEnvVars(e)}
                            className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${!isClickable ? "cursor-not-allowed bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-500"} text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
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

export { Form };
