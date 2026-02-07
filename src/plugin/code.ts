// This code runs in Figma's plugin sandbox
// It has access to the Figma API but no browser/DOM APIs

figma.showUI(__html__, { width: 400, height: 600 });

// Helper function to serialize Figma nodes to plain JSON
function serializeNode(node: BaseNode): any {
	const base: any = {
		id: node.id,
		name: node.name,
		type: node.type,
	};
	
	// Add text-specific properties
	if (node.type === 'TEXT') {
		const textNode = node as TextNode;
		// console.log('textNode.characters:', textNode.characters);
		
		base.characters = textNode.characters;

		// Properly serialize fontSize (could be symbol or number)
		const fontSize =
			typeof textNode.fontSize === 'symbol' ? 14 : textNode.fontSize;

		// Properly serialize fontName object
		const fontName = textNode.fontName as FontName;
		base.style = {
			fontSize: fontSize,
			fontFamily: fontName?.family || 'Arial',
		};
	}

	// Add dimension properties
	if ('width' in node && 'height' in node) {
		base.absoluteBoundingBox = {
			width: (node as any).width,
			height: (node as any).height,
		};
	}

	// Add fill properties (serialize to plain objects)
	if ('fills' in node) {
		const fills = (node as any).fills;
		if (fills !== figma.mixed && Array.isArray(fills)) {
			base.fills = fills
				.map((fill: any) => {
					if (fill.type === 'SOLID') {
						return {
							type: 'SOLID',
							color: {
								r: fill.color.r,
								g: fill.color.g,
								b: fill.color.b,
							},
						};
					}
					return null;
				})
				.filter(Boolean);
		}
	}

	// Recursively serialize children
	if ('children' in node) {
		base.children = (node as any).children.map((child: BaseNode) =>
			serializeNode(child)
		);
	}

	return base;
}

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
	if (msg.type === 'get-figma-nodes') {
		console.log('msg received in UI #1:', msg);
		try {
			// Get only selected nodes
			const selection = figma.currentPage.selection;
			// console.log('selection:', selection);
			// console.log('figma.currentPage', figma.currentPage);
			
			
			if (!selection || selection.length === 0) {
				figma.ui.postMessage({
					type: 'error',
					message: 'No nodes selected. Please select one or more nodes.',
				});
				return;
			}

			const nodes = selection.map((node) => serializeNode(node));

			// Send back to UI
			figma.ui.postMessage({
				type: 'figma-nodes-data',
				nodes: nodes,
			});
		} catch (error) {
			figma.ui.postMessage({
				type: 'error',
				message:
					error instanceof Error
						? error.message
						: 'Failed to read nodes',
			});
		}
	}
};


