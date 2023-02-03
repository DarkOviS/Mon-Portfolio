import { useContext, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./AdminMenu";

export default function AdminContact() {
  const { auth } = useContext(AuthContext);
  const [contactData, setContactData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setContactData(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  return (
    <section className="project_admin">
      <AdminMenu />

      {contactData.map((contact) => (
        <div className="contact_map" key={contact.id}>
          <p>{contact.firstname}</p>
          <p>{contact.lastname}</p>
          <p>{contact.username}</p>
          <p>{contact.email}</p>
          <p>{contact.tel_number}</p>

          <button
            type="button"
            onClick={() => navigate(`/admin/edit/contact/${contact.id}`)}
          >
            <AiFillEdit className="edit_button" />
          </button>
        </div>
      ))}
    </section>
  );
}
