import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ModelsDeployed from "../pages/ModelsDeployed";
import NavBar from "../components/NavBar"; // Ensure this path is correct

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/models-deployed" element={<ModelsDeployed />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
