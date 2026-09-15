import { useConversion } from '../hooks';

export function DesignStep() {
	const { nodes, loading, refreshSelection } = useConversion();
	const selected = nodes[0];
	return (
		<section className="screen" aria-labelledby="design-title">
			<div className="eyebrow">Step 1 of 5</div>
			<h1 id="design-title">Choose your design</h1>
			<p className="supporting">
				Select a top-level frame in Figma. FigmaKit reads only the
				layers needed for conversion.
			</p>
			<div className={`selection-card ${selected ? 'selected' : ''}`}>
				<div className="selection-preview" aria-hidden="true">
					<span>{selected ? '✓' : '◇'}</span>
				</div>
				<div className="selection-copy">
					<strong>{selected?.name ?? 'No frame selected'}</strong>
					<span>
						{selected
							? `${Math.round(selected.width ?? 0)} × ${Math.round(selected.height ?? 0)} · ${selected.children?.length ?? 0} top-level layers`
							: 'Select a frame or section on the canvas to begin.'}
					</span>
				</div>
			</div>
			<button
				className="button primary"
				onClick={refreshSelection}
				disabled={loading}
			>
				{loading ? (
					<>
						<span className="spinner" /> Reading selection…
					</>
				) : selected ? (
					'Refresh selection'
				) : (
					'Read current selection'
				)}
			</button>
			<div className="privacy-note">
				<span>▣</span>
				<p>
					<strong>Your design stays in your control</strong>Only the
					selected layer structure is processed. Nothing is uploaded
					in this version.
				</p>
			</div>
		</section>
	);
}
