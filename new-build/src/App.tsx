import "./App.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="h-screen">
          <NavBar />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
