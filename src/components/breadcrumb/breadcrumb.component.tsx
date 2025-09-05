import { Link, useLocation } from "react-router-dom";
import "./breadcrumb.scss";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb">
      <Link to="/admin">🏠 Admin</Link>
      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo} className="crumb">
            <span className="separator">›</span>
            {isLast ? (
              <span className="current">{name}</span>
            ) : (
              <Link to={routeTo}>{name}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
