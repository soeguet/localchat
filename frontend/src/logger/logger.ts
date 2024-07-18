class Logger {
	private logLevel: string;
	private endpoint: string;

	constructor(logLevel: string, endpoint: string) {
		this.logLevel = logLevel;
		this.endpoint = endpoint;
	}

	private sendLog(level: string, message: string, meta?: any) {
		fetch(this.endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				level,
				message,
				meta,
				timestamp: new Date().toISOString(),
			}),
		}).catch((error) => {
			console.error("Error sending log:", error);
		});
	}

	info(message: string, meta?: any) {
		if (this.logLevel === "info" || this.logLevel === "debug") {
			this.sendLog("info", message, meta);
		}
	}

	debug(message: string, meta?: any) {
		if (this.logLevel === "debug") {
			this.sendLog("debug", message, meta);
		}
	}

	error(message: string, meta?: any) {
		this.sendLog("error", message, meta);
	}
}

const logger = new Logger("info", "http://localhost:5588/v1/log/error");

export default logger;
