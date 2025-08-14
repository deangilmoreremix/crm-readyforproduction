// Minimal utility helpers used by UI components
// Lightweight cn implementation to merge className strings without extra deps
export function cn(
	...inputs: Array<string | undefined | null | false>
): string {
	return inputs.filter(Boolean).join(" ");
}

export default cn;
