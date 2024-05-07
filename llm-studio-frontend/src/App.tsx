import React from "react";
import "./App.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import AppRouter from "./routes/index.tsx"; // Ensure this import path is correct

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="h-screen">
          <AppRouter />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
