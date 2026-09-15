import type { ConversionTarget } from '@/core/targets';
import { useConversion } from '../hooks';
import { ToggleRow } from '../components/ToggleRow';

const targets: {
	id: ConversionTarget;
	name: string;
	detail: string;
	meta: string;
	available: boolean;
	icon: string;
}[] = [
	{
		id: 'elementor',
		name: 'Elementor',
		detail: 'Native containers and widgets',
		meta: 'JSON template',
		available: true,
		icon: 'E',
	},
	{
		id: 'gutenberg',
		name: 'Gutenberg',
		detail: 'Native WordPress core blocks',
		meta: 'Block markup',
		available: true,
		icon: 'G',
	},
	{
		id: 'elementskit',
		name: 'ElementsKit',
		detail: 'Advanced Elementor widgets',
		meta: 'Coming soon',
		available: false,
		icon: 'EK',
	},
	{
		id: 'gutenkit',
		name: 'GutenKit',
		detail: 'Advanced Gutenberg blocks',
		meta: 'Coming soon',
		available: false,
		icon: 'GK',
	},
];

export function TargetStep() {
	const {
		target,
		setTarget,
		toggle,
		aiEnabled,
		responsiveEnabled,
		preferNative,
		analyze,
		loading,
		setStep,
	} = useConversion();
	return (
		<section className="screen" aria-labelledby="target-title">
			<div className="eyebrow">Step 2 of 5</div>
			<h1 id="target-title">Choose an output</h1>
			<p className="supporting">
				Your result stays native and editable in the selected WordPress
				builder.
			</p>
			<div className="target-grid">
				{targets.map((item) => (
					<button
						key={item.id}
						disabled={!item.available}
						onClick={() => setTarget(item.id)}
						className={`target-card ${target === item.id ? 'selected' : ''}`}
						aria-pressed={target === item.id}
					>
						<span className={`target-icon ${item.id}`}>
							{item.icon}
						</span>
						<span className="target-copy">
							<strong>{item.name}</strong>
							<small>{item.detail}</small>
							<em>{item.meta}</em>
						</span>
						<span className="radio" />
					</button>
				))}
			</div>
			<div className="section-label">Conversion preferences</div>
			<div className="settings-card">
				<ToggleRow
					label="AI assistance"
					description="Suggest semantics for ambiguous components"
					checked={aiEnabled}
					onChange={() => toggle('aiEnabled')}
					disabled
				/>
				<ToggleRow
					label="Responsive suggestions"
					description="Infer tablet and mobile behavior"
					checked={responsiveEnabled}
					onChange={() => toggle('responsiveEnabled')}
				/>
				<ToggleRow
					label="Prefer native components"
					description="Keep output editable and reliable"
					checked={preferNative}
					onChange={() => toggle('preferNative')}
				/>
			</div>
			<p className="microcopy">
				AI is shown as planned until the secure backend is configured.
				Deterministic conversion remains available.
			</p>
			<div className="actions">
				<button
					className="button text"
					onClick={() => setStep('design')}
				>
					Back
				</button>
				<button
					className="button primary"
					onClick={analyze}
					disabled={loading}
				>
					{loading ? 'Analyzing…' : 'Analyze design'} <span>→</span>
				</button>
			</div>
		</section>
	);
}
