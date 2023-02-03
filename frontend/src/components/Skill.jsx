import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Skill() {
  const { auth } = useContext(AuthContext);
  const [skillsData, setSkillsData] = useState([]);

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
    <section>
      <h1>Mes Compétences</h1>
      {skillsData.map((skill) => (
        <div key={skill.id}>
          <p>{skill.name}</p>
        </div>
      ))}
    </section>
  );
}
