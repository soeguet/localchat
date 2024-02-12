import { useEffect, useState } from "react";
import { useEnvVarsStore } from "../stores/useEnvVarsStore";
import { EnvVars } from "../utils/customTypes";

type FormProps = {
    checkIfEnvVarsAllSet: (envVars: EnvVars) => void;
};
function Form(props: FormProps) {
    const [clientName, setClientName] = useState<string>("");
    const [socketIp, setSocketIp] = useState<string>("");
    const [socketPort, setSocketPort] = useState<string>("");

    useEffect(() => {
        setTimeout(() => {
            const envZustand: EnvVars = useEnvVarsStore.getState().zustandVar;
            setClientName(envZustand.username);
            setSocketIp(envZustand.ip);
            setSocketPort(envZustand.port);
        }, 1000);
    }, []);

    /**
     * Saves the environment variables.
     * @param e - The form event.
     */
    function saveEnvVars(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        useEnvVarsStore.getState().setEnvVars({
            username: clientName,
            ip: socketIp,
            port: socketPort,
            os: useEnvVarsStore.getState().zustandVar.os,
        });

        //revalidate the env vars
        props.checkIfEnvVarsAllSet(useEnvVarsStore.getState().zustandVar);
    }

    return (
        <>
            <div className="m-20 overflow-hidden rounded-lg bg-gray-100 shadow">
                <div className="p-10">
                    <div className="space-y-4">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">missing env variables</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="client-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        <i>client name:</i>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={clientName}
                                            onBlur={(e) => {
                                                if (e.target.value === "") {
                                                    //TODO add validation
                                                }
                                            }}
                                            name="client-name"
                                            placeholder="e.g. Workstation"
                                            onChange={(e) => setClientName(e.target.value)}
                                            className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="socket-ip"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        <i>socket ip:</i>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={socketIp}
                                            name="socket-ip"
                                            placeholder="e.g. 127.0.0.1"
                                            onChange={(e) => setSocketIp(e.target.value)}
                                            className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="socket-port"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        <i>socket port:</i>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={socketPort}
                                            name="socket-port"
                                            placeholder="e.g. 8080"
                                            onChange={(e) => setSocketPort(e.target.value)}
                                            className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={(e) => saveEnvVars(e)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;