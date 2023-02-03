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
import Admin from "./components/Admin/AdminMenu";
import Contact from "./components/Contact";
import { AuthContext } from "./contexts/AuthContext";
import AdminSkillEdit from "./components/Admin/AdminSkillEdit";
import AdminSkills from "./components/Admin/AdminSkills";
import AdminProjects from "./components/Admin/AdminProjects";
import AdminProjectEdit from "./components/Admin/AdminProjectEdit";
import AdminContact from "./components/Admin/AdminContact";
import AdminContactEdit from "./components/Admin/AdminContactEdit";

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
          <Route path="/login" element={<Login />} />
          <Route
            element={
              auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
            }
          >
            <Route path="/admin" element={<Admin />} />

            <Route path="/admin/skills" element={<AdminSkills />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/edit/skill/:id" element={<AdminSkillEdit />} />
            <Route
              path="/admin/edit/project/:id"
              element={<AdminProjectEdit />}
            />
            <Route path="/admin/contact" element={<AdminContact />} />
            <Route
              path="/admin/edit/contact/:id"
              element={<AdminContactEdit />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
