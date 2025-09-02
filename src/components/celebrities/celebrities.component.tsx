import React from "react";

interface Celebrity {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const celebrities: Celebrity[] = [
  { id: 1, name: "Samuel N. Jack", role: "Actor", avatar: "/images/uploads/ava1.jpg" },
  { id: 2, name: "Benjamin Carroll", role: "Actor", avatar: "/images/uploads/ava2.jpg" },
  { id: 3, name: "Beverly Griffin", role: "Actor", avatar: "/images/uploads/ava3.jpg" },
  { id: 4, name: "Justin Weaver", role: "Actor", avatar: "/images/uploads/ava4.jpg" },
];

const CelebritiesComponent: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="celebrities">
        <h4 className="sb-title">Spotlight Celebrities</h4>
        {celebrities.map((c) => (
          <div className="celeb-item" key={c.id}>
            <a href="#">
              <img src={c.avatar} alt={c.name} width="70" height="70" />
            </a>
            <div className="celeb-author">
              <h6>
                <a href="#">{c.name}</a>
              </h6>
              <span>{c.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelebritiesComponent;
