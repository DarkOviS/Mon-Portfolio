import { useContext, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./AdminMenu";
import "./AdminSkills.css";

export default function AdminSkills() {
  const navigate = useNavigate();
  const [skillsData, setSkillsData] = useState([]);
  const { auth } = useContext(AuthContext);
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
  return (
    <section className="Admin-skill">
      <AdminMenu />
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
