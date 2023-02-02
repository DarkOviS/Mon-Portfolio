import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./AdminMenu.css";

export default function AdminMenu() {
  return (
    <div className="admin-menu">
      <Link to="/">
        <img src="/src/assets/R.png" alt="originslogo" className="logo" />
      </Link>
      <div className="border-header">
        <Link style={{ textDecoration: "none" }} to="/admin">
          <h1 className="title">Admin Panel</h1>
        </Link>
      </div>
      <nav className="border-menu">
        <NavLink className="category-menu" to="/admin/skills">
          <h2 className="border">Skills</h2>
        </NavLink>
        <NavLink to="/admin/projects">
          <h2 className="border">Projects</h2>
        </NavLink>
      </nav>
    </div>
  );
}
