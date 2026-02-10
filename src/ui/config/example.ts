/**
 * FigmaKit - Working Example
 * Demonstrates complete Figma to Elementor conversion
 */

import { FigmaNode } from '@/types/elementor';
import { buildAndExportElementorPage } from '@/builder/pageBuilder';

/**
 * Example Figma node structure
 * Simulates a typical Figma design with header and content
 */
export const exampleFigmaNode: FigmaNode = {
	id: 'figma-root-frame',
	type: 'FRAME',
	name: 'Landing Page',
	layoutMode: 'VERTICAL',
	primaryAxisAlignItems: 'MIN',
	counterAxisAlignItems: 'CENTER',
	itemSpacing: 20,
	paddingTop: 40,
	paddingRight: 40,
	paddingBottom: 40,
	paddingLeft: 40,
	fills: [
		{
			type: 'SOLID',
			color: { r: 1, g: 1, b: 1 },
		},
	],
	children: [
		// Header Container
		{
			id: 'header-frame',
			type: 'FRAME',
			name: 'Header',
			layoutMode: 'HORIZONTAL',
			primaryAxisAlignItems: 'SPACE_BETWEEN',
			counterAxisAlignItems: 'CENTER',
			itemSpacing: 10,
			paddingTop: 20,
			paddingRight: 45,
			paddingBottom: 20,
			paddingLeft: 45,
			fills: [
				{
					type: 'SOLID',
					color: { r: 0.95, g: 0.95, b: 0.98 },
				},
			],
			cornerRadius: 8,
			children: [
				// Logo Text
				{
					id: 'logo-text',
					type: 'TEXT',
					name: 'Logo',
					characters: 'FigmaKit',
					style: {
						fontSize: 32,
						fontFamily: 'Inter',
						fontWeight: 700,
					},
					fills: [
						{
							type: 'SOLID',
							color: { r: 0.1, g: 0.1, b: 0.1 },
						},
					],
				},
				// Navigation Text
				{
					id: 'nav-text',
					type: 'TEXT',
					name: 'Navigation',
					characters: 'Home • Features • Pricing • Contact',
					style: {
						fontSize: 16,
						fontFamily: 'Inter',
						fontWeight: 400,
					},
					fills: [
						{
							type: 'SOLID',
							color: { r: 0.3, g: 0.3, b: 0.3 },
						},
					],
				},
			],
		},
		// Hero Section
		{
			id: 'hero-frame',
			type: 'FRAME',
			name: 'Hero Section',
			layoutMode: 'VERTICAL',
			primaryAxisAlignItems: 'CENTER',
			counterAxisAlignItems: 'CENTER',
			itemSpacing: 24,
			paddingTop: 60,
			paddingRight: 40,
			paddingBottom: 60,
			paddingLeft: 40,
			fills: [
				{
					type: 'SOLID',
					color: { r: 0.98, g: 0.98, b: 1 },
				},
			],
			cornerRadius: 12,
			children: [
				// Heading
				{
					id: 'hero-heading',
					type: 'TEXT',
					name: 'Hero Heading',
					characters: 'Convert Figma to WordPress Elementor',
					style: {
						fontSize: 48,
						fontFamily: 'Inter',
						fontWeight: 700,
						textAlignHorizontal: 'CENTER',
					},
					fills: [
						{
							type: 'SOLID',
							color: { r: 0.05, g: 0.05, b: 0.15 },
						},
					],
				},
				// Subheading
				{
					id: 'hero-subheading',
					type: 'TEXT',
					name: 'Hero Subheading',
					characters:
						'Transform your Figma designs into production-ready Elementor pages instantly',
					style: {
						fontSize: 20,
						fontFamily: 'Inter',
						fontWeight: 400,
						textAlignHorizontal: 'CENTER',
					},
					fills: [
						{
							type: 'SOLID',
							color: { r: 0.4, g: 0.4, b: 0.5 },
						},
					],
				},
				// Hero Image
				{
					id: 'hero-image',
					type: 'RECTANGLE',
					name: 'Hero Image',
					absoluteBoundingBox: {
						width: 800,
						height: 450,
					},
					cornerRadius: 8,
					fills: [
						{
							type: 'IMAGE',
							imageRef:
								'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
						},
					],
				},
			],
		},
		// Features Section
		{
			id: 'features-frame',
			type: 'FRAME',
			name: 'Features',
			layoutMode: 'HORIZONTAL',
			primaryAxisAlignItems: 'MIN',
			counterAxisAlignItems: 'STRETCH',
			itemSpacing: 30,
			paddingTop: 40,
			paddingRight: 40,
			paddingBottom: 40,
			paddingLeft: 40,
			children: [
				// Feature 1
				{
					id: 'feature-1',
					type: 'FRAME',
					name: 'Feature Card 1',
					layoutMode: 'VERTICAL',
					itemSpacing: 16,
					paddingTop: 24,
					paddingRight: 24,
					paddingBottom: 24,
					paddingLeft: 24,
					fills: [
						{
							type: 'SOLID',
							color: { r: 1, g: 1, b: 1 },
						},
					],
					cornerRadius: 12,
					children: [
						{
							id: 'feature-1-title',
							type: 'TEXT',
							characters: 'Widget Based',
							style: {
								fontSize: 24,
								fontFamily: 'Inter',
								fontWeight: 600,
							},
							fills: [
								{
									type: 'SOLID',
									color: { r: 0.1, g: 0.1, b: 0.1 },
								},
							],
						},
						{
							id: 'feature-1-desc',
							type: 'TEXT',
							characters:
								'Scalable architecture with modular widgets',
							style: {
								fontSize: 16,
								fontFamily: 'Inter',
								fontWeight: 400,
							},
							fills: [
								{
									type: 'SOLID',
									color: { r: 0.5, g: 0.5, b: 0.5 },
								},
							],
						},
					],
				},
				// Feature 2
				{
					id: 'feature-2',
					type: 'FRAME',
					name: 'Feature Card 2',
					layoutMode: 'VERTICAL',
					itemSpacing: 16,
					paddingTop: 24,
					paddingRight: 24,
					paddingBottom: 24,
					paddingLeft: 24,
					fills: [
						{
							type: 'SOLID',
							color: { r: 1, g: 1, b: 1 },
						},
					],
					cornerRadius: 12,
					children: [
						{
							id: 'feature-2-title',
							type: 'TEXT',
							characters: 'Production Ready',
							style: {
								fontSize: 24,
								fontFamily: 'Inter',
								fontWeight: 600,
							},
							fills: [
								{
									type: 'SOLID',
									color: { r: 0.1, g: 0.1, b: 0.1 },
								},
							],
						},
						{
							id: 'feature-2-desc',
							type: 'TEXT',
							characters: 'Export valid Elementor JSON instantly',
							style: {
								fontSize: 16,
								fontFamily: 'Inter',
								fontWeight: 400,
							},
							fills: [
								{
									type: 'SOLID',
									color: { r: 0.5, g: 0.5, b: 0.5 },
								},
							],
						},
					],
				},
				// Feature 3
				{
					id: 'feature-3',
					type: 'FRAME',
					name: 'Feature Card 3',
					layoutMode: 'VERTICAL',
					itemSpacing: 16,
					paddingTop: 24,
					paddingRight: 24,
					paddingBottom: 24,
					paddingLeft: 24,
					fills: [
						{
							type: 'SOLID',
							color: { r: 1, g: 1, b: 1 },
						},
					],
					cornerRadius: 12,
					children: [
						{
							id: 'feature-3-title',
							type: 'TEXT',
							characters: 'Smart Mapping',
							style: {
								fontSize: 24,
								fontFamily: 'Inter',
								fontWeight: 600,
							},
							fills: [
								{
									type: 'SOLID',
									color: { r: 0.1, g: 0.1, b: 0.1 },
								},
							],
						},
						{
							id: 'feature-3-desc',
							type: 'TEXT',
							characters:
								'Automatic Figma to Elementor conversion',
							style: {
								fontSize: 16,
								fontFamily: 'Inter',
								fontWeight: 400,
							},
							fills: [
								{
									type: 'SOLID',
									color: { r: 0.5, g: 0.5, b: 0.5 },
								},
							],
						},
					],
				},
			],
		},
	],
};

/**
 * Convert the example and generate Elementor JSON
 */
export function generateExampleOutput(): string {
	return buildAndExportElementorPage(
		exampleFigmaNode,
		'FigmaKit Landing Page',
		true
	);
}

/**
 * Run the example
 */
if (typeof window === 'undefined') {
	// Node.js environment - output to console
	console.log('=== FigmaKit Conversion Example ===\n');
	console.log('Input: Figma Landing Page with Header, Hero, and Features\n');
	console.log('Output: Elementor JSON\n');
	console.log(generateExampleOutput());
}
