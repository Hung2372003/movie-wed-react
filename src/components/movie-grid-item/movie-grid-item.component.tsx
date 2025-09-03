import React from "react";
import type { Movie } from "../../layouts/movie-grid/movie-grid.component";

interface MovieItemProps {
  movie: Movie;
}

const MovieGridItemComponent: React.FC<MovieItemProps> = ({ movie }) => {
  return (
    <div className="movie-item-style-2 movie-item-style-1">
      <img src={movie.image} alt={movie.title} />
      <div className="hvr-inner">
        <a href={`/movies/${movie.id}`}>
          Read more <i className="ion-android-arrow-dropright"></i>
        </a>
      </div>
      <div className="mv-item-infor">
        <h6>
          <a href={`/movies/${movie.id}`}>{movie.title}</a>
        </h6>
        <p className="rate">
          <i className="ion-android-star"></i>
          <span>{movie.rating}</span> /10
        </p>
      </div>
    </div>
  );
};

export default MovieGridItemComponent;
