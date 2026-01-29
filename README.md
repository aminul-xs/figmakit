# Figma Plugin - Vite + React

A Figma plugin template using Vite and React with TypeScript.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

This will:

- Start Vite dev server for the UI with hot reload
- Watch and rebuild plugin code on changes

## Build

```bash
npm run build
```

This creates production builds in the `dist/` folder.

## How to Use in Figma

1. Open Figma Desktop App
2. Go to `Plugins` → `Development` → `Import plugin from manifest...`
3. Select the `manifest.json` file from this project
4. Run the plugin from `Plugins` → `Development` → `My Figma Plugin`

## Project Structure

```
src/
  ├── plugin/          # Plugin sandbox code (runs in Figma)
  │   └── code.ts
  ├── ui/              # React UI (runs in iframe)
  │   ├── App.tsx
  │   ├── App.css
  │   └── main.tsx
  └── types/           # Shared types
      └── messages.ts
```

## Communication

The plugin uses `postMessage` API:

- UI → Plugin: `parent.postMessage({ pluginMessage: {...} }, '*')`
- Plugin → UI: `figma.ui.postMessage({...})`
