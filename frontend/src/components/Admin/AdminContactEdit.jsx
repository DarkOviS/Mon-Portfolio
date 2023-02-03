import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./AdminMenu";

export default function AdminContactEdit() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const fisrtnameRef = useRef();
  const lastnameRef = useRef();
  const username = useRef();
  const emailRef = useRef();
  const telNumberRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5001/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        fisrtnameRef.current.value = data.firstname;
        lastnameRef.current.value = data.lastname;
        username.current.value = data.username;
        emailRef.current.value = data.email;
        telNumberRef.current.value = data.tel_number;
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  const handleSubmit = () => {
    const dataPost = {
      firstname: fisrtnameRef.current.value,
      lastname: lastnameRef.current.value,
      username: username.current.value,
      email: emailRef.current.value,
      tel_number: telNumberRef.current.value,
    };
    fetch(`http://localhost:5001/users/${id}`, {
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
    <section className="project_edit">
      <AdminMenu />
      <div>
        <form
          className="form_project_edit_form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type="text" ref={fisrtnameRef} />
          <input type="text" ref={lastnameRef} />
          <input type="text" className="link" ref={username} />
          <input type="text" className="startYear" ref={emailRef} />
          <input type="text" className="startYear" ref={telNumberRef} />
          <input type="submit" value="Connexion" className="sign_in" />
          {show && <p>Modifié</p>}
        </form>
      </div>
    </section>
  );
}
