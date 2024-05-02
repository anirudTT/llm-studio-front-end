import "./App.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

import { Button } from "@/components/ui/button";

import { NavBar } from "./components/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <div className="h-screen">
          {/* <h1 className="text-3xl font-bold underline">Hello hot reload!</h1> */}
          {/* <Button>Click me</Button> */}
          <NavBar />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
