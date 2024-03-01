import {FormEvent, useEffect, useState} from "react";
import useUserStore from "../../stores/userStore";
import useEnvironmentStore from "../../stores/environmentStore";
import {useTranslation} from "react-i18next";

function Form() {
    const {t} = useTranslation();
    const setClientName = useUserStore((state) => state.setMyUsername);
    const setSocketIp = useEnvironmentStore((state) => state.setSocketIp);
    const setSocketPort = useEnvironmentStore((state) => state.setSocketPort);

    const clientName = useUserStore((state) => state.myUsername);
    const socketIp = useEnvironmentStore((state) => state.socketIp);
    const socketPort = useEnvironmentStore((state) => state.socketPort);

    const [isClickable, setIsClickable] = useState(true);
    const [localClientName, setLocalClientName] = useState<string>("");
    const [localSocketIp, setLocalSocketIp] = useState<string>("");
    const [localSocketPort, setLocalSocketPort] = useState<string>("");

    useEffect(() => {
        setLocalClientName(clientName);
        setLocalSocketIp(socketIp);
        setLocalSocketPort(socketPort);
    }, [clientName,socketIp,socketPort]);

    /**
     * Saves the environment variables.
     * @param e - The form event.
     */
    function saveEnvVars(e: FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsClickable(false);

        // TODO validation for the inputs needed
        if (localClientName === "" || localSocketIp === "" || localSocketPort === "") {
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
            <div className="m-20 overflow-hidden bg-gray-100 rounded-lg shadow">
                <div className="p-10">
                    <div className="space-y-4">
                        <div className="pb-12 border-b border-gray-900/10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">{t("missing_env_vars")}</h2>

                            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                            onBlur={(e) => {
                                                if (e.target.value === "") {
                                                    //TODO add validation
                                                }
                                            }}
                                            name="client-name"
                                            placeholder={t("client_name_placeholder")}
                                            onChange={(e) => setLocalClientName(e.target.value)}
                                            className="block w-full px-3 py-3 text-gray-900 border-0 rounded-md shadow-sm placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            onChange={(e) => setLocalSocketIp(e.target.value)}
                                            className="block w-full px-3 py-3 text-gray-900 border-0 rounded-md shadow-sm placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            onChange={(e) => setLocalSocketPort(e.target.value)}
                                            className="block w-full px-3 py-3 text-gray-900 border-0 rounded-md shadow-sm placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-6 gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            onClick={(e) => saveEnvVars(e)}
                            className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${!isClickable ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"} text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            {isClickable ? t("save_env_vars") : t("saving_env_vars")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;