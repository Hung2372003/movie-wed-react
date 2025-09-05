import { NavLink, Outlet } from "react-router-dom";
import "./admin-layout.scss";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>🎬 Admin Panel</h2>
        <nav>
          <NavLink
            to="dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="movies"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Movies
          </NavLink>
          <NavLink
            to="episodes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Episodes
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Users
          </NavLink>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
