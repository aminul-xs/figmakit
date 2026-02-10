/**
 * Determine if an element is an inner element
 * Used for nested containers in Elementor
 * @param depth - Nesting depth (0 = root, 1+ = inner)
 */
export function getIsInner(depth: number = 0): boolean {
	return depth > 0;
}
