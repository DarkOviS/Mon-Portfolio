import { useContext, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./AdminMenu";
import "./AdminProjects.css";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projectsData, setProjectsData] = useState([]);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:5001/projects`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjectsData(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  return (
    <section>
      <AdminMenu />
      {projectsData.map((project) => (
        <div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <Link to={project.link}>
            <BsGithub />
          </Link>
          <p>{project.start_year}</p>
          <p>{project.end_year}</p>

          <button
            type="button"
            onClick={() => navigate(`/admin/project/${project.id}`)}
          >
            <AiFillEdit className="edit_button" />
          </button>
        </div>
      ))}
    </section>
  );
}
