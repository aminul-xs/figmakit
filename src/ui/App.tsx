import { useState } from 'react'
import type { PluginMessage, UIMessage } from '../types/messages'
import './App.css'

function App() {
  const [count, setCount] = useState(3)
  const [message, setMessage] = useState('')

  const handleCreateRectangles = () => {
    const msg: PluginMessage = {
      type: 'create-rectangles',
      count: count
    }
    parent.postMessage({ pluginMessage: msg }, '*')
  }

  const handleClose = () => {
    const msg: PluginMessage = {
      type: 'close'
    }
    parent.postMessage({ pluginMessage: msg }, '*')
  }

  // Listen for messages from the plugin
  window.onmessage = (event) => {
    const msg = event.data.pluginMessage as UIMessage
    
    if (msg.type === 'rectangles-created') {
      setMessage(`✅ Created ${msg.count} rectangles!`)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="app" style={{ background: 'red' }}>
      <h1>Figma Plugin + Vite + React X</h1>
      
      <div className="card">
        <div className="input-group">
          <label htmlFor="count">Number of rectangles:</label>
          <input
            id="count"
            type="number"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          />
        </div>

        <button onClick={handleCreateRectangles}>
          Create Rectangles
        </button>

        {message && <p className="message">{message}</p>}
      </div>

      <button className="close-btn" onClick={handleClose}>
        Close Plugin
      </button>
    </div>
  )
}

export default App
