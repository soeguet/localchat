export function checkIfPortOutOfBounds(port: string) {
    return Number.parseInt(port) < 0 ||
        Number.parseInt(port) > 65535;
}

export function checkIfPortIsValid(port: string) {
    const portRegex = /^[0-9]+$/;
    return portRegex.test(port);
}

export function checkIfIpIsValid(ip: string) {
    const ipregex =
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipregex.test(ip);
}