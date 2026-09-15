let idCounter = 0;

export function createElementId(): string {
	idCounter = (idCounter + 1) % 0xffff;
	const timestamp = Date.now() & 0xffff;
	const random = Math.floor(Math.random() * 0xffff);
	const combined = ((timestamp ^ random) << 16) | idCounter;
	return (combined >>> 0).toString(16).padStart(8, '0');
}
