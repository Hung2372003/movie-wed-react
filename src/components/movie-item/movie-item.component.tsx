import React from "react";

interface Props {
  title: string;
  poster: string;
  rating: number;
}

const MovieItemComponent: React.FC<Props> = ({ title, poster, rating }) => {
  return (
<div className="movie-item">
      <div className="mv-img">
        <img src={poster} alt={title} />
      </div>
      <div className="hvr-inner">
        <a href="moviesingle.html">
          Read more <i className="ion-android-arrow-dropright"></i>
        </a>
      </div>
      <div className="title-in">
        <h6>
          <a href="#">{title}</a>
        </h6>
        <p>
          <i className="ion-android-star"></i>
          <span>{rating}</span> /10
        </p>
      </div>
    </div>
  );
};

export default MovieItemComponent;
