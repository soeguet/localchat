/**
 * Formats the given date into a string representation of time.
 * @param date - The date to format.
 * @returns The formatted time string.
 */
export function getTimeWithHHmmFormat(date: Date): string {
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes}`;
}