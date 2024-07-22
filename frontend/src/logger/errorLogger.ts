import { useUserStore } from "../stores/userStore";

interface HttpLogger {
	logError(error: Error): void;
}

class ErrorLogger implements HttpLogger {
	#socketIP: string;
	#socketPort: string;

	constructor(socketIP: string, socketPort: string) {
		this.#socketIP = socketIP;
		this.#socketPort = socketPort;
	}

	setSocketIP(socketIP: string) {
		this.#socketIP = socketIP;
	}

	setSocketPort(socketPort: string) {
		this.#socketPort = socketPort;
	}

	getSocketIP() {
		return this.#socketIP;
	}

	getSocketPort() {
		return this.#socketPort;
	}

	async logError(error: unknown) {
		if (!(error instanceof Error)) {
			errorLogger.logError(
				new Error("Error is not an instance of Error"),
			);
			return;
		}

		const time = new Date().toISOString();
		const clientDbId = useUserStore.getState().myId;
		const clientUsername = useUserStore.getState().myUsername;

		const errorPayload = {
			title: error.name,
			message: error.message,
			stack: error.stack,
			time: time,
			clientDbId: clientDbId,
			clientUsername: clientUsername,
		};

		try {
			const response = await fetch(
				`http://${this.#socketIP}:${this.#socketPort}/v1/log/error`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(errorPayload),
				},
			);

			if (!response.ok) {
				// if the request fails, log the error to the console
				console.error("Failed to log error", response.statusText);
				console.error("Error message: ", error);
			}
		} catch (loggingError) {
			console.error("Error logging error", loggingError);
		}
	}
}

const socketIP = useUserStore.getState().socketIp;
const socketPort = useUserStore.getState().socketPort;

const errorLogger = new ErrorLogger(socketIP, socketPort);

export { errorLogger };
