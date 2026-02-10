/**
 * Generate a unique ID for Elementor elements
 * Uses counter, timestamp, and random values to ensure uniqueness
 */
let idCounter = 0;

export function getUniqueId(): string {
	// Increment counter for uniqueness even in rapid succession
	idCounter = (idCounter + 1) % 0xFFFF;
	
	// Mix counter, timestamp, and random for true uniqueness
	const timestamp = Date.now() & 0xFFFF; // Last 16 bits of timestamp
	const random = Math.floor(Math.random() * 0xFFFF);
	const counter = idCounter;
	
	// Combine into 32-bit unsigned value and convert to 8-char hex
	const combined = ((timestamp ^ random) << 16) | counter;
	// Force unsigned 32-bit integer conversion to prevent negative hex
	const hex = (combined >>> 0).toString(16).padStart(8, '0');
	
	return hex;
}
