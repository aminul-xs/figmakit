import { useCallback } from 'react';
import type { ExportArtifact } from '@/core/targets';

export function useArtifactDownload(artifact: ExportArtifact | null) {
	return useCallback(() => {
		if (!artifact) return;
		const url = URL.createObjectURL(
			new Blob([artifact.content], { type: artifact.mimeType })
		);
		const link = document.createElement('a');
		link.href = url;
		link.download = artifact.filename;
		link.click();
		URL.revokeObjectURL(url);
	}, [artifact]);
}
