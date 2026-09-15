export interface ElementorElement {
	id: string;
	settings: Record<string, unknown>;
	elements: ElementorElement[];
	isInner: boolean;
	widgetType?: string;
	elType: 'widget' | 'container';
}

export interface ElementorPage {
	content: ElementorElement[];
	page_settings: Record<string, unknown>;
	version: string;
	title: string;
	type: 'page';
}

export interface ElementorDimension {
	unit: string;
	size: number;
	sizes: unknown[];
}

export interface ElementorBox {
	unit: string;
	top: string;
	right: string;
	bottom: string;
	left: string;
	isLinked: boolean;
}

export interface HeadingWidgetSettings extends Record<string, unknown> {
	title?: string;
	header_size?: string;
	align?: string;
	typography_typography?: string;
	typography_font_family?: string;
	typography_font_size?: ElementorDimension;
	typography_font_weight?: string;
	typography_text_transform?: string;
	title_color?: string;
}

export interface ImageWidgetSettings extends Record<string, unknown> {
	image?: { url: string; id: string };
	image_size?: string;
	width?: ElementorDimension;
	height?: ElementorDimension;
	object_fit?: string;
}

export interface ContainerWidgetSettings extends Record<string, unknown> {
	content_position?: string;
	flex_direction?: string;
	flex_align_items?: string;
	flex_justify_content?: string;
	flex_gap?: { size: number; column: string; row: string; unit: string; isLinked: boolean };
	padding?: ElementorBox;
	background_background?: string;
	background_color?: string;
	border_radius?: ElementorBox;
}

export type ElementorWidgetFactory = (
	data: unknown,
	depth?: number
) => ElementorElement;
