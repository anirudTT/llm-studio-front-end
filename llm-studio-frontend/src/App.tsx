import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      LLM STUDIO
      <div>
        <Button variant="outline">Button</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
      <button className="bg-blue-900 hover:bg-blue-300 text-green font-bold py-2 px-4 rounded">
        Test Button
      </button>
      <button className="bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
        Click Me
      </button>
      <button className="bg-green-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
        Click Me
      </button>
    </>
  );
}

export default App;
