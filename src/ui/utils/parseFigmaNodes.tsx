import { FigmaNode, ElementorWidget, ElementorPage } from '../../types/elementor';

// Parse Figma nodes into Elementor widgets
export function parseFigmaNodes(
	nodes: FigmaNode[],
	isInner: boolean = false
): ElementorWidget[] {
	return nodes
		.map((node) => {
			switch (node.type) {
				case 'TEXT':
					return {
						id: node.id,
						elType: 'widget',
						widgetType: 'heading',
						isInner: isInner,
						settings: {
							title:
								node.characters || 'Add Your Heading Text Here',
							typography_typography: 'custom',
							typography_font_family:
								node.style?.fontFamily || 'Arial',
							typography_font_size: {
								unit: 'px',
								size: node.style?.fontSize || 14,
								sizes: [],
							},
							typography_font_weight: '400',
							ekit_all_conditions_list: [],
							ekit_badge_label: '',
							ekit_adv_tooltip_content: '',
							ekit_cursor_text_label: 'Elementskit Cursor',
						},
						elements: [],
					} as ElementorWidget;

				case 'RECTANGLE':
				case 'IMAGE':
					return {
						id: node.id,
						elType: 'widget',
						widgetType: 'image',
						isInner: isInner,
						settings: {
							image: {
								url: '',
								id: 0,
								size: '',
								alt: '',
								source: 'library',
							},
							width: {
								unit: 'px',
								size: node.absoluteBoundingBox?.width || 300,
								sizes: [],
							},
							height: {
								unit: 'px',
								size: node.absoluteBoundingBox?.height || 300,
								sizes: [],
							},
							ekit_all_conditions_list: [],
							ekit_badge_label: '',
							ekit_adv_tooltip_content: '',
							ekit_cursor_text_label: 'Elementskit Cursor',
						},
						elements: [],
					} as ElementorWidget;

				case 'FRAME':
				case 'GROUP':
					const children = node.children
						? parseFigmaNodes(node.children, true)
						: [];
					return {
						id: node.id,
						elType: 'container',
						isInner: isInner,
						settings: {
							content_width: 'full',
							ekit_section_parallax_multi_items: [],
							ekit_all_conditions_list: [],
							ekit_cursor_text_label: 'Elementskit Cursor',
						},
						elements: children,
					} as ElementorWidget;

				default:
					if (node.children)
						return parseFigmaNodes(node.children, isInner);
					return null;
			}
		})
		.flat()
		.filter(Boolean) as ElementorWidget[];
}

// Create full Elementor page structure
export function createElementorPage(nodes: FigmaNode[]): ElementorPage {
	const content = parseFigmaNodes(nodes, false);

	return {
		content: content,
		page_settings: [],
		version: '0.4',
		title: 'Figma Design',
		type: 'page',
	};
}
