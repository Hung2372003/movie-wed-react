import React from "react";

interface Trailer {
  id: number;
  title: string;
  duration: string;
  thumb: string;
  url: string;
}

interface Props {
  trailers: Trailer[];
  activeTrailer: Trailer;
  onSelectTrailer: (t: Trailer) => void;
}

const TrailerThumbsComponent: React.FC<Props> = ({ trailers, activeTrailer, onSelectTrailer }) => {
  return (
    <div className="slider-nav-2 thumb-ft">
      {trailers.map((t) => (
        <div
          key={t.id}
          className={`item ${activeTrailer.id === t.id ? "active" : ""}`}
          onClick={() => onSelectTrailer(t)}
          style={{ cursor: "pointer" }}
        >
          <div className="trailer-img">
            <img src={t.thumb} alt={t.title} />
          </div>
          <div className="trailer-infor">
            <h4 className="desc">{t.title}</h4>
            <p>{t.duration}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrailerThumbsComponent;
