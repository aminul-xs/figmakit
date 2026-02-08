Prompt: 
context: FigmaKit - Figma to WordPress ( Elementor) Converter. 

1/ I want to create a full Elementor page, section, widgets, etc structure in the src/ui/widgets folder. This will allow me to easily manage and customize my Elementor pages by organizing all the necessary components in one place. I will start by creating a new folder called "widgets" within the "src" directory, and then I will add the necessary files for each widget I want to use on my Elementor pages. This structure will help me keep everything organized and make it easier to maintain and update my Elementor pages in the future.Here is an example of how I can structure the "widgets" folder:

src/
  widgets/
    widget1/
	  widget1.tsx
	widget2/
	  widget2.tsx

```
 // heading.tsx (all control value define here) etc  widget specific settings (figma name: GROUP,FRAME,IMAGE,RECTANGLE, TEXT)
 export const HeadingWidget = {
	id: getUniqueId(),
	elType: 'widget',
	widgetType: 'heading',
	isInner: getIsInner(),
	settings: {}, 
 }

```
2/ all widgets init or regidter in one file like index.tsx and export to use in other place like main file or page file.

3/ In this example, I have created a "widgets" folder within the "src" directory, and inside it, I have created two folders for different widgets (widget1 and widget2). Each widget folder contains a TypeScript file (widget1.tsx and widget2.tsx) where I can define the structure and functionality of each widget. not utils folder difine control value in widget file itself. only ultils folder define common function like getUniqueId() and getIsInner() which can be used across all widgets. 


4/ widgets config related all here src/ui/config/widgets.ts
5/ Type define here src/types/*.ts

Example: Elementor [json](./note.md)