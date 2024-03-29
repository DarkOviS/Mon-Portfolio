import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Contact() {
  const { auth } = useContext(AuthContext);
  const [contactData, setContactData] = useState([]);

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
    <section className="Contact">
      {contactData.map((contact) => (
        <div className="contact_map" key={contact.id}>
          <p>{contact.firstname}</p>
          <p>{contact.lastname}</p>
          <p>{contact.username}</p>
          <p>{contact.email}</p>
          <p>{contact.tel_number}</p>
        </div>
      ))}
    </section>
  );
}
