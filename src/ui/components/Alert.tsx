export function Alert({
	tone = 'error',
	children,
}: {
	tone?: 'error' | 'warning' | 'info' | 'success';
	children: React.ReactNode;
}) {
	return (
		<div
			className={`alert ${tone}`}
			role={tone === 'error' ? 'alert' : 'status'}
		>
			<span aria-hidden="true">
				{tone === 'error' ? '!' : tone === 'success' ? '✓' : 'i'}
			</span>
			<div>{children}</div>
		</div>
	);
}
