import { type FormEvent, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { useTranslation } from "react-i18next";
import { useEnvironmentVariablesLoader } from "../../hooks/setup/useEnvLoader";

function Form() {
	const { t } = useTranslation();

	const [isClickable, setIsClickable] = useState(true);
	const [localClientName, setLocalClientName] = useState("");
	const [localSocketIp, setLocalSocketIp] = useState(
		useUserStore.getState().socketIp,
	);
	const [localSocketPort, setLocalSocketPort] = useState(
		useUserStore.getState().socketPort,
	);

	function validateStateVariables() {
		// regex for ip address
		let allGood = true;
		const ipRegex =
			/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

		// check if localsocketip is a valid ip address
		if (!ipRegex.test(localSocketIp)) {
			console.error("Invalid socket ip");
			setLocalSocketIp("");
			allGood = false;
		}

		// check if localsocketport is a valid port
		if (Number.isNaN(Number.parseInt(localSocketPort))) {
			console.error("Invalid socket port");
			setLocalSocketPort("");
			allGood = false;
		}

		// check if port is smaller than 0 or greater than 65535
		if (
			Number.parseInt(localSocketPort) < 0 ||
			Number.parseInt(localSocketPort) > 65535
		) {
			console.error("Invalid socket port");
			setLocalSocketPort("");
			allGood = false;
		}

		if (allGood) {
			console.log("State variables are valid");
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
			return true;
		}

		return false;
	}

	/**
	 * Saves the environment variables.
	 * @param e - The form event.
	 */
	function saveEnvVars(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		console.log("localClientName", localClientName);
		console.log("localSocketIp", localSocketIp);
		console.log("localSocketPort", localSocketPort);
		setIsClickable(false);
		setTimeout(() => {
			setIsClickable(true);
		}, 1000);

		if (checkIfStateVariablesAreEmpty()) {
			console.error("Empty state variables");
			return;
		}
		if (validateStateVariables()) {
			console.error("Invalid state variables");
			return;
		}

		// // validate the state variables
		// if (!validateStateVariables()) {
		// 	setIsClickable(true);
		// 	return;
		// }
		//
		// if (checkIfStateVariablesAreEmpty()) {
		// 	setIsClickable(true);
		// 	return;
		// }

		// set the environment variables
		useUserStore.getState().setMyUsername(localClientName || "");
		useUserStore.getState().setSocketIp(localSocketIp);
		useUserStore.getState().setSocketPort(localSocketPort);
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

export { Form };
