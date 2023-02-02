import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [errorInput, setErrorInput] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    const dataPost = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .then((data) => {
        const { token, user } = data;
        const { role, id } = user;
        if (token) {
          setAuth((oldAuth) => ({
            ...oldAuth,
            isAuthenticated: true,
            token,
            role,
            id,
          }));
          navigate("/");
        } else {
          setErrorInput(true);
        }
      })

      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <form
        className="form_login"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="email"
          className="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          type="password"
          className="password"
          name="password"
          minLength="8"
          required
          placeholder="Mot de passe"
          ref={passwordRef}
        />
        <input type="submit" value="Connexion" className="sign_in" />
        {errorInput && <p className="error">Email ou mot de passe incorrect</p>}
      </form>
    </div>
  );
}
