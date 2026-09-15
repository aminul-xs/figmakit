import { useConversion } from '../hooks';

export function PublishStep() {
	const { websiteUrl, target, setStep, download } = useConversion();
	return (
		<section className="screen" aria-labelledby="publish-title">
			<div className="eyebrow">Step 5 of 5</div>
			<h1 id="publish-title">Ready to import</h1>
			<p className="supporting">
				Review the destination and choose a safe publishing action.
			</p>
			<div className="summary-card">
				<div>
					<span>Destination</span>
					<strong>{websiteUrl || 'No website connected'}</strong>
				</div>
				<div>
					<span>Builder</span>
					<strong>{target}</strong>
				</div>
				<div>
					<span>Mode</span>
					<strong>New page</strong>
				</div>
			</div>
			<div className="publish-choice recommended">
				<span className="choice-icon">◫</span>
				<div>
					<strong>
						Import as draft <em>Recommended</em>
					</strong>
					<small>
						Create a private draft for review before publishing.
					</small>
				</div>
			</div>
			<div className="publish-choice disabled">
				<span className="choice-icon">↗</span>
				<div>
					<strong>Publish live</strong>
					<small>
						Available after the secure connector is implemented and
						verified.
					</small>
				</div>
			</div>
			<div className="actions stacked">
				<button className="button primary" disabled>
					Import as draft
				</button>
				<button className="button outlined" onClick={download}>
					Download instead
				</button>
				<button
					className="button text"
					onClick={() => setStep('website')}
				>
					Back to website
				</button>
			</div>
		</section>
	);
}
