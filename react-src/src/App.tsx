import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ChatBubble from './components/ChatBubble'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <div>
        <ChatBubble
          name="John Doe"
          time="10:45 PM"
          message="Hey there, how's it going?"
          isUser={false}
          profilePhoto="https://example.com/path/to/image.jpg" />
        <ChatBubble
          name="Me"
          time="10:46 PM"
          message="All good, just working on my project. You?"
          isUser={true}
          profilePhoto="https://example.com/path/to/my-image.jpg" />

        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
