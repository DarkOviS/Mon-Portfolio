import { useContext, useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./AdminMenu";
import "./AdminSkills.css";

export default function AdminSkills() {
  const navigate = useNavigate();
  const [skillsData, setSkillsData] = useState([]);
  const { auth } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const nameRef = useRef();
  const typeRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5001/skills`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSkillsData(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  const handleSubmit = () => {
    const dataPost = {
      name: nameRef.current.value,
      type: typeRef.current.value,
    };
    fetch(`http://localhost:5001/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(dataPost),
    })
      .then((res) => {
        setShow(true);
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <section className="Admin-skill">
      <AdminMenu />
      <button type="button" onClick={() => setShowForm(!showForm)}>
        <IoAddCircleOutline />
      </button>
      {showForm && (
        <form
          className="form-skill"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            className="name"
            placeholder="Name"
            ref={nameRef}
          />
          <input type="text" className="type" ref={typeRef} />
          <input type="submit" value="Ajouter" className="sign_in" />
          {show && <p>Modifié</p>}
        </form>
      )}
      {skillsData.map((skill) => (
        <div key={skill.id}>
          <p>{skill.name}</p>
          <p>{skill.type}</p>
          <button
            type="button"
            onClick={() => navigate(`/admin/edit/skill/${skill.id}`)}
          >
            <AiFillEdit className="edit_button" />
          </button>
        </div>
      ))}
    </section>
  );
}
