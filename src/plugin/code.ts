// This code runs in Figma's plugin sandbox
// It has access to the Figma API but no browser/DOM APIs

figma.showUI(__html__, { width: 400, height: 500 })

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-rectangles') {
    const { count } = msg

    const nodes: SceneNode[] = []

    for (let i = 0; i < count; i++) {
      const rect = figma.createRectangle()
      rect.x = i * 150
      rect.fills = [{ type: 'SOLID', color: { r: Math.random(), g: Math.random(), b: Math.random() } }]
      figma.currentPage.appendChild(rect)
      nodes.push(rect)
    }

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)

    // Send message back to UI
    figma.ui.postMessage({
      type: 'rectangles-created',
      count: nodes.length
    })
  }

  if (msg.type === 'close') {
    figma.closePlugin()
  }
}
