import { useConversion } from '../hooks';
import { Alert } from '../components/Alert';

export function ReviewStep() {
	const { diagnostics, nodes, target, artifact, setStep } = useConversion();
	const errors = diagnostics.filter(({ severity }) => severity === 'error');
	const warnings = diagnostics.filter(
		({ severity }) => severity === 'warning'
	);
	const ready = errors.length === 0;
	const nodeCount = (items: typeof nodes): number =>
		items.reduce(
			(sum, node) => sum + 1 + nodeCount(node.children ?? []),
			0
		);
	return (
		<section className="screen" aria-labelledby="review-title">
			<div className="eyebrow">Step 3 of 5</div>
			<h1 id="review-title">Review conversion</h1>
			<p className="supporting">
				Check mapping quality before choosing where the result should
				go.
			</p>
			<div className={`score-card ${ready ? 'ready' : 'attention'}`}>
				<div className="score-ring">
					<strong>{ready ? 96 : 72}</strong>
					<small>/100</small>
				</div>
				<div>
					<span className="status-pill">
						{ready ? '✓ Ready' : '! Must fix'}
					</span>
					<strong>
						{ready ? 'Ready to continue' : 'Action required'}
					</strong>
					<small>
						{target === 'gutenberg'
							? 'Native WordPress blocks'
							: 'Native Elementor widgets'}
					</small>
				</div>
			</div>
			<div className="metrics">
				<div>
					<strong>{nodeCount(nodes)}</strong>
					<span>Layers read</span>
				</div>
				<div>
					<strong>{warnings.length}</strong>
					<span>Warnings</span>
				</div>
				<div>
					<strong>{errors.length}</strong>
					<span>Errors</span>
				</div>
			</div>
			<div className="section-heading">
				<span>Compatibility report</span>
				<small>{artifact?.filename}</small>
			</div>
			{diagnostics.length === 0 ? (
				<Alert tone="success">
					<strong>All structural checks passed</strong>
					<p>
						The generated output is ready for website validation or
						download.
					</p>
				</Alert>
			) : (
				<div className="issue-list">
					{diagnostics.map((item, index) => (
						<Alert
							key={`${item.code}-${index}`}
							tone={
								item.severity === 'error'
									? 'error'
									: item.severity === 'warning'
										? 'warning'
										: 'info'
							}
						>
							<strong>{item.code}</strong>
							<p>{item.message}</p>
						</Alert>
					))}
				</div>
			)}
			<div className="mapping-card">
				<div>
					<span className="mapping-icon">◇</span>
					<p>
						<strong>Native mapping</strong>
						<small>
							{target === 'gutenberg'
								? 'Columns, Column, Image, Paragraph'
								: 'Container, Heading, Image'}
						</small>
					</p>
				</div>
				<span className="status-pill quiet">Deterministic</span>
			</div>
			<div className="actions">
				<button
					className="button text"
					onClick={() => setStep('target')}
				>
					Back
				</button>
				<button
					className="button primary"
					onClick={() => setStep('website')}
					disabled={!ready}
				>
					Continue to website <span>→</span>
				</button>
			</div>
		</section>
	);
}
