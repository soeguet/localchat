import type { Hash } from "./customTypes";

export function unixTimestamp() {
	return Date.now().toString();
}

export function fnv1aHash(str: string): number {
	let hash = 2166136261;
	for (let i = 0; i < str.length; i++) {
		hash ^= str.charCodeAt(i);
		hash +=
			(hash << 1) +
			(hash << 4) +
			(hash << 7) +
			(hash << 8) +
			(hash << 24);
	}
	return hash >>> 0;
}

export function generateUnixTimestampFnv1aHash() {
	const hashAsNumber = fnv1aHash(unixTimestamp());
	const hashAsString = hashAsNumber.toString(16) as Hash;

	return hashAsString;
}
