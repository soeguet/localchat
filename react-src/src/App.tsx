import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ChatBubble from './components/ChatBubble'
import ChatInputSection from './components/ChatInputSection'

function App() {
  const [count, setCount] = useState(0)

  function displayMessage(text: string): void {
    console.log(text)
  }

  return (
    <>
      <div className='flex flex-col justify-evenly h-screen'>
        <div className='grow m-5'>
          <ChatBubble
            name="John Doe"
            time="10:45 PM"
            message="Hey there, how's it going?"
            isUser={false}
            profilePhoto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk1wr1yrOBQiwirwFdBeIUAeIU9vPg09-NpaXWEipuyQ&s" />
          <ChatBubble
            name="Me"
            time="10:46 PM"
            message="All good, just working on my project. You?"
            isUser={true}
            profilePhoto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTknVlvLdeZKfg--zh687bCOU7R9mdf_KaleoQxTzMsgg&s" />
        </div>
        <div className='grow-0'>
          <ChatInputSection onSend={displayMessage} />
        </div>
      </div>
    </>
  )
}

export default App
