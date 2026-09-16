import type { AppStep } from '../context/conversion';
import { useConversion } from '../hooks';

const steps: { id: AppStep; label: string }[] = [
	{ id: 'design', label: 'Design' },
	{ id: 'target', label: 'Target' },
	{ id: 'review', label: 'Review' },
	{ id: 'website', label: 'Website' },
	{ id: 'publish', label: 'Publish' },
];

export function StepIndicator() {
	const { step } = useConversion();
	const current = steps.findIndex(({ id }) => id === step);
	return (
		<nav className="stepper" aria-label="Conversion progress">
			{steps.map((item, index) => (
				<div
					className={`step ${index === current ? 'active' : ''} ${index < current ? 'complete' : ''}`}
					key={item.id}
					aria-current={index === current ? 'step' : undefined}
				>
					<span>{index < current ? '✓' : index + 1}</span>
					<small>{item.label}</small>
				</div>
			))}
		</nav>
	);
}
