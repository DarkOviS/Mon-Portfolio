import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./AdminMenu";

export default function AdminProjectEdit() {
  const { id } = useParams();

  const { auth } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const linkRef = useRef();
  const startYearRef = useRef();
  const endYearRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5001/projects/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        titleRef.current.value = data.name;
        descriptionRef.current.value = data.description;
        linkRef.current.value = data.link;
        startYearRef.current.value = data.start_year;
        endYearRef.current.value = data.end_year;
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  const handleSubmit = () => {
    const dataPost = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      link: linkRef.current.value,
      start_year: startYearRef.current.value,
      end_year: endYearRef.current.value,
    };
    fetch(`http://localhost:5001/projects/${id}`, {
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
    <section>
      <AdminMenu />
      <div>
        <form
          className="form_login"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type="text" className="title" ref={titleRef} />
          <input type="text" className="description" ref={descriptionRef} />
          <input type="text" className="link" ref={linkRef} />
          <input type="text" className="startYear" ref={startYearRef} />
          <input type="text" className="startYear" ref={endYearRef} />
          <input type="submit" value="Connexion" className="sign_in" />
          {show && <p>Modifié</p>}
        </form>
      </div>
    </section>
  );
}
