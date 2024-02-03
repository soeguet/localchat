import ChatBubble from "./components/ChatBubble";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollableDiv from "./components/ScrollableDiv";

function App() {
  return (
    <div className="bg-green-900 flex flex-col justify-between h-screen">
      <Navbar />
      {/* <button className="bg-red-500">heyyyyy :D</button>
      <ScrollableDiv />
      <footer>
        <Footer />
      </footer> */}
    </div>
  );
}

export default App;
