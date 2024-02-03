import ChatBubble from "./components/ChatBubble";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="overflow-auto m-5">
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
