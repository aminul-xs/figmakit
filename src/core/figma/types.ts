export interface FigmaColor {
	r: number;
	g: number;
	b: number;
}

export interface FigmaFill {
	type: string;
	color?: FigmaColor;
	imageRef?: string;
	imageHash?: string;
	scaleMode?: string;
}

export interface FigmaNode {
	id: string;
	type: string;
	name?: string;
	characters?: string;
	style?: {
		fontSize?: number;
		fontFamily?: string;
		fontWeight?: number;
		textAlignHorizontal?: string;
		textCase?: string;
		lineHeightPx?: number;
		letterSpacing?: number;
		textDecoration?: string;
	};
	fontName?: { family: string; style: string };
	fontSize?: number;
	textAlignHorizontal?: string;
	textCase?: string;
	textDecoration?: string;
	lineHeight?: { unit: string; value: number };
	letterSpacing?: number;
	fills?: FigmaFill[];
	strokes?: FigmaFill[];
	strokeWeight?: number;
	opacity?: number;
	absoluteBoundingBox?: { width?: number; height?: number };
	width?: number;
	height?: number;
	cornerRadius?: number;
	rectangleCornerRadii?: [number, number, number, number];
	paddingTop?: number;
	paddingRight?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	layoutMode?: string;
	primaryAxisAlignItems?: string;
	counterAxisAlignItems?: string;
	itemSpacing?: number;
	children?: FigmaNode[];
}
