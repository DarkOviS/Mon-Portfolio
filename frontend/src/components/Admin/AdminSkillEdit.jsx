import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./AdminMenu";
import "./AdminSkills.css";

export default function AdminSkillEdit() {
  const { id } = useParams();

  const { auth } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const nameRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:5001/skills/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        nameRef.current.value = data.name;
        typeRef.current.value = data.type;
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [id]);
  const handleSubmit = () => {
    const dataPost = {
      name: nameRef.current.value,
      type: typeRef.current.value,
    };
    fetch(`http://localhost:5001/skills/${id}`, {
      method: "PUT",
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
      <div>
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
            name="name"
            placeholder="Name"
            ref={nameRef}
          />
          <input type="text" className="type" ref={typeRef} />
          <input type="submit" value="modifier" className="sign_in" />
          {show && <p>Modifié</p>}
        </form>
      </div>
    </section>
  );
}
