import "./App.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

import { NavBar } from "./components/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <div className="h-screen flex items-center justify-center">
          <NavBar />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
