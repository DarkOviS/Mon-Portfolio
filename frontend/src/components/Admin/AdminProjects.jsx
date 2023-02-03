import { useContext, useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./AdminMenu";
import "./AdminProjects.css";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projectsData, setProjectsData] = useState([]);
  const { auth } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [show, setShow] = useState(false);
  const titleRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const linkRef = useRef();
  const startYearRef = useRef();
  const endYearRef = useRef();

  const updateProject = (project) => {
    setProjectsData(
      projectsData.map((oldProject) =>
        oldProject.id === project.id ? project : oldProject
      )
    );
  };

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

  const handleSubmit = () => {
    const dataPost = {
      title: titleRef.current.value,
      image: imageRef.current.value,
      description: descriptionRef.current.value,
      link: linkRef.current.value,
      start_year: startYearRef.current.value,
      end_year: endYearRef.current.value,
    };
    fetch(`http://localhost:5001/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(dataPost),
    })
      .then((res) => {
        setShow(true);
        updateProject(dataPost);
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <section className="project_admin">
      <AdminMenu />
      <button type="button" onClick={() => setShowForm(!showForm)}>
        <IoAddCircleOutline />
      </button>
      {showForm && (
        <form
          className="form_project_edit_form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type="text" className="title" ref={titleRef} />
          <input type="text" className="image" ref={imageRef} />
          <input type="text" className="description" ref={descriptionRef} />
          <input type="text" className="link" ref={linkRef} />
          <input type="text" className="startYear" ref={startYearRef} />
          <input type="text" className="startYear" ref={endYearRef} />
          <input type="submit" value="Ajouter" className="sign_in" />
          {show && <p>Ajouté</p>}
        </form>
      )}
      {projectsData.map((project) => (
        <div className="project_map">
          <img src={project.image} alt={project.title} />
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <Link to={project.link}>
            <BsGithub />
          </Link>
          <p>{project.start_year}</p>
          <p>{project.end_year}</p>

          <button
            type="button"
            onClick={() => navigate(`/admin/edit/project/${project.id}`)}
          >
            <AiFillEdit className="edit_button" />
          </button>
        </div>
      ))}
    </section>
  );
}
