import React from "react";
import "./App.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ComboboxForm } from "./components/ComboboxForm";
import AppRouter from "./routes/index.tsx"; // Ensure this import path is correct

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
