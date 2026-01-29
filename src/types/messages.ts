// Type definitions for messages between plugin and UI
export interface CreateRectanglesMessage {
  type: 'create-rectangles'
  count: number
}

export interface CloseMessage {
  type: 'close'
}

export interface RectanglesCreatedMessage {
  type: 'rectangles-created'
  count: number
}

export type PluginMessage = CreateRectanglesMessage | CloseMessage
export type UIMessage = RectanglesCreatedMessage
