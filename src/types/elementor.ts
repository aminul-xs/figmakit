// Figma node structure
export type FigmaNode = {
	id: string;
	type: string;
	name?: string;
	characters?: string;
	style?: {
		fontSize?: number;
		fontFamily?: string;
	};
	fills?: Array<{ type: string; color?: any }>;
	absoluteBoundingBox?: { width?: number; height?: number };
	cornerRadius?: number;
	paddingTop?: number;
	paddingRight?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	children?: FigmaNode[];
};

// Elementor widget structure
export type ElementorWidget = {
	id: string;
	settings: Record<string, any>;
	elements?: ElementorWidget[];
	isInner?: boolean;
	widgetType?: string;
	elType: 'widget' | 'container';
};

// Elementor page structure
export type ElementorPage = {
	content: ElementorWidget[];
	page_settings: any[];
	version: string;
	title: string;
	type: string;
};
