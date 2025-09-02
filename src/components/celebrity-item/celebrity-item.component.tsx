import React from "react";

interface CelebrityItemProps {
  name: string;
  role: string;
  image: string;
  link?: string;
}

const CelebrityItem: React.FC<CelebrityItemProps> = ({ name, role, image, link }) => {
  return (
    <div className="celeb-item">
      <a href={link || "#"}>
        <img src={image} alt={name} width={70} height={70} />
      </a>
      <div className="celeb-author">
        <h6>
          <a href={link || "#"}>{name}</a>
        </h6>
        <span>{role}</span>
      </div>
    </div>
  );
};

export default CelebrityItem;
