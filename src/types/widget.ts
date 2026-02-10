/**
 * Base types for FigmaKit widgets
 */

export interface WidgetBase {
	id: string;
	settings: Record<string, any>;
	elements: WidgetBase[];
	isInner?: boolean;
	widgetType?: string;
	elType: 'widget' | 'container';
}

export interface HeadingWidgetSettings {
	title?: string;
	header_size?: string;
	align?: string;
	typography_typography?: string;
	typography_font_family?: string;
	typography_font_size?: {
		unit: string;
		size: number;
		sizes: any[];
	};
	typography_font_weight?: string;
	typography_text_transform?: string;
	title_color?: string;
	[key: string]: any;
}

export interface ImageWidgetSettings {
	image?: {
		url: string;
		id: string;
	};
	image_size?: string;
	width?: {
		unit: string;
		size: number;
		sizes: any[];
	};
	height?: {
		unit: string;
		size: number;
		sizes: any[];
	};
	object_fit?: string;
	[key: string]: any;
}

export interface ContainerWidgetSettings {
	content_position?: string;
	flex_direction?: string;
	flex_align_items?: string;
	flex_justify_content?: string;
	flex_gap?: {
		size: number;
		column: string;
		row: string;
		unit: string;
		isLinked: boolean;
	};
	padding?: {
		unit: string;
		top: string;
		right: string;
		bottom: string;
		left: string;
		isLinked: boolean;
	};
	background_background?: string;
	background_color?: string;
	border_radius?: {
		unit: string;
		top: string;
		right: string;
		bottom: string;
		left: string;
		isLinked: boolean;
	};
	[key: string]: any;
}

export type WidgetFactory = (data: any, depth?: number) => WidgetBase;
