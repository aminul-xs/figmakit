import { useState, useEffect } from 'react';
import { createElementorPage } from '../utils/parseFigmaNodes';
import type { ElementorPage } from '../../types/elementor';

export default function FigmaToElementor() {
	const [elementorData, setElementorData] = useState<ElementorPage | null>(
		null
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');

	// Request data from the plugin context (no API key needed!)
	const handleFetchFromPlugin = () => {
		setLoading(true);
		setError('');
        console.log('Fetching Figma nodes from plugin...', parent);
        
		// Ask the plugin code to send us the current file's nodes
		parent.postMessage(
			{
				pluginMessage: { type: 'get-figma-nodes' },
			},
			'*'
		);
	};

	// Listen for messages from the plugin
	useEffect(() => {
		window.onmessage = (event) => {
			const msg = event.data.pluginMessage;
			console.log('msg received in UI:', msg);

			if (msg?.type === 'figma-nodes-data') {
				try {
					const elementorPage = createElementorPage(msg.nodes);
					setElementorData(elementorPage);
					setLoading(false);
				} catch (err) {
					console.error('Error parsing Figma nodes:', err);
					setError(
						err instanceof Error
							? err.message
							: 'Failed to parse nodes'
					);
					setLoading(false);
				}
			}

			if (msg?.type === 'error') {
				setError(msg.message);
				setLoading(false);
			}
		};
	}, []);

	return (
		<div style={{ padding: '20px' }}>
			<h2>Elementor `_element_data` Preview</h2>

			<div style={{ marginBottom: '20px' }}>
				<button
					onClick={handleFetchFromPlugin}
					disabled={loading}
					style={{
						padding: '10px 20px',
						cursor: loading ? 'not-allowed' : 'pointer',
						fontSize: '14px',
						backgroundColor: '#0066ff',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
					}}
				>
					{loading
						? 'Loading...'
						: 'Convert Selected Nodes to Elementor'}
				</button>

				<div
					style={{
						marginTop: '10px',
						fontSize: '12px',
						color: '#666',
					}}
				>
					✨ No API key needed - converts the currently selected nodes.
				</div>
			</div>

			{error && (
				<div
					style={{
						padding: '10px',
						backgroundColor: '#fee',
						border: '1px solid #c00',
						borderRadius: '4px',
						marginBottom: '20px',
					}}
				>
					<strong>Error:</strong> {error}
				</div>
			)}

			{loading && <p>Loading...</p>}
			{elementorData && (
				<pre
					style={{
						backgroundColor: '#f5f5f5',
						padding: '15px',
						borderRadius: '4px',
						overflow: 'auto',
					}}
				>
					{JSON.stringify(elementorData, null, 2)}
				</pre>
			)}
		</div>
	);
}
