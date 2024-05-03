import "./App.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NavBar } from "./components/NavBar";
import "./index.css";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="h-screen">
          <NavBar />
          <h1 className="text-13xl font-bold underline">Hello world!</h1>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
