import "./App.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import NavBar from "./components/NavBar";
import { ComboboxForm } from "./components/ComboboxForm";

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col h-screen">
          <NavBar />
          <div className="flex flex-grow justify-center items-center">
            <ComboboxForm />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
