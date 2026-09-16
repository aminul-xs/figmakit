function sanitize(value: unknown, seen: WeakSet<object>): unknown {
	if (
		value === null ||
		typeof value === 'string' ||
		typeof value === 'boolean'
	)
		return value;
	if (typeof value === 'number') return Number.isFinite(value) ? value : null;
	if (
		typeof value === 'undefined' ||
		typeof value === 'symbol' ||
		typeof value === 'function'
	)
		return undefined;
	if (typeof value !== 'object' || seen.has(value)) return undefined;
	seen.add(value);

	if (Array.isArray(value)) {
		const result = value
			.map((item) => sanitize(item, seen))
			.filter((item) => item !== undefined);
		seen.delete(value);
		return result;
	}

	const result: Record<string, unknown> = {};
	for (const [key, item] of Object.entries(value)) {
		const safeItem = sanitize(item, seen);
		if (safeItem !== undefined) result[key] = safeItem;
	}
	seen.delete(value);
	return result;
}

/** Removes figma.mixed Symbols and every other value unsupported by structured clone. */
export function makePostMessageSafe<T>(value: T): T {
	return sanitize(value, new WeakSet()) as T;
}
