import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";

import "./App.css";
import About from "./components/About";
import Skill from "./components/Skill";
import Login from "./components/Login";
import Project from "./components/Project";
import Contact from "./components/Contact";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skill" element={<Skill />} />

          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            element={
              auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
