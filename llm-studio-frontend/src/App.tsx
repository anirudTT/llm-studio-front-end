import "./App.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="h-screen">
          <NavBar />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
