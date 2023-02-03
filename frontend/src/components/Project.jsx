import { useContext, useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Skill from "./Skill";

export default function Project() {
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
    <section id="projects">
      <h1>Mes Projets</h1>
      {projectsData.map((project) => (
        <div>
          <img src={project.image} alt={project.title} />
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <Link to={project.link}>
            <BsGithub />
          </Link>
          <p>{project.start_year}</p>
          <p>{project.end_year}</p>
        </div>
      ))}
      <Skill />
    </section>
  );
}
