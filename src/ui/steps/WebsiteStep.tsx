import { Alert } from '../components/Alert';
import { useConversion } from '../hooks';

export function WebsiteStep() {
	const {
		websiteUrl,
		setWebsiteUrl,
		connectWebsite,
		connectionStatus,
		error,
		setStep,
		download,
	} = useConversion();
	return (
		<section className="screen" aria-labelledby="website-title">
			<div className="eyebrow">Step 4 of 5</div>
			<h1 id="website-title">Choose a destination</h1>
			<p className="supporting">
				Connect WordPress for direct import, or download the generated
				file now.
			</p>
			<div className="connect-card">
				<div className="connect-heading">
					<span className="wp-icon">W</span>
					<div>
						<strong>Connect WordPress</strong>
						<small>Requires the FigmaKit connector plugin</small>
					</div>
				</div>
				<label className="field">
					<span>Website URL</span>
					<input
						type="url"
						value={websiteUrl}
						onChange={(event) => setWebsiteUrl(event.target.value)}
						placeholder="https://example.com"
					/>
				</label>
				<button
					className="button tonal"
					onClick={connectWebsite}
					disabled={connectionStatus === 'connecting'}
				>
					{connectionStatus === 'connecting'
						? 'Checking website…'
						: 'Start secure connection'}
				</button>
			</div>
			{error && <Alert>{error}</Alert>}
			{connectionStatus === 'unavailable' && (
				<Alert tone="info">
					<strong>Connector backend is not configured</strong>
					<p>
						No website changes were made. Download is available
						while direct import is under development.
					</p>
				</Alert>
			)}
			<div className="divider">
				<span>or</span>
			</div>
			<div className="download-card">
				<span>↓</span>
				<div>
					<strong>Download output file</strong>
					<small>
						Import it manually without connecting a website.
					</small>
				</div>
				<button className="button outlined" onClick={download}>
					Download
				</button>
			</div>
			<div className="actions">
				<button
					className="button text"
					onClick={() => setStep('review')}
				>
					Back
				</button>
				<button
					className="button primary"
					onClick={() => setStep('publish')}
					disabled={connectionStatus !== 'connected'}
				>
					Continue <span>→</span>
				</button>
			</div>
		</section>
	);
}
