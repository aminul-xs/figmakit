import { Alert } from './components/Alert';
import { AppHeader } from './components/AppHeader';
import { StepIndicator } from './components/StepIndicator';
import { useConversion } from './hooks';
import { ConversionProvider } from './providers';
import { DesignStep } from './steps/DesignStep';
import { PublishStep } from './steps/PublishStep';
import { ReviewStep } from './steps/ReviewStep';
import { TargetStep } from './steps/TargetStep';
import { WebsiteStep } from './steps/WebsiteStep';

function Workspace() {
	const { step, error } = useConversion();
	return (
		<main className="app-shell">
			<AppHeader />
			<StepIndicator />
			<div className="content-area">
				{error && step !== 'website' && <Alert>{error}</Alert>}
				{step === 'design' && <DesignStep />}
				{step === 'target' && <TargetStep />}
				{step === 'review' && <ReviewStep />}
				{step === 'website' && <WebsiteStep />}
				{step === 'publish' && <PublishStep />}
			</div>
		</main>
	);
}

export default function App() {
	return (
		<ConversionProvider>
			<Workspace />
		</ConversionProvider>
	);
}
