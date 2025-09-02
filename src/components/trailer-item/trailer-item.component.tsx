import React from "react";

interface TrailerItemProps {
  image: string;
  title: string;
  duration: string;
}

const TrailerItem: React.FC<TrailerItemProps> = ({ image, title, duration }) => {
  return (
    <div className="item">
      <div className="trailer-img">
        <img src={image} alt={title} />
      </div>
      <div className="trailer-infor">
        <h4 className="desc">{title}</h4>
        <p>{duration}</p>
      </div>
    </div>
  );
};

export default TrailerItem;
