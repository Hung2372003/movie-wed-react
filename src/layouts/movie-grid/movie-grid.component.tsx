import React, { useState } from "react";
import MovieGridItemComponent from "../../components/movie-grid-item/movie-grid-item.component";

export interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
}

interface MovieListProps {
  movies: Movie[];
  total: number;
  onSortChange?: (sort: string) => void;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void; // thêm callback nếu cần dùng bên ngoài
  moviesPerPage?: number;
}

const MovieGridComponent: React.FC<MovieListProps> = ({
  movies,
  total,
  onSortChange,
  onPageChange,
  onPerPageChange,
  moviesPerPage = 20,
}) => {
  const [sort, setSort] = useState("popularity");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(moviesPerPage);

  const totalPages = Math.ceil(total / perPage);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    onSortChange?.(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value, 10);
    setPerPage(newPerPage);
    setPage(1); // reset về trang 1 khi đổi perPage
    onPerPageChange?.(newPerPage);
  };

  return (
    <>
      {/* Topbar filter */}
      <div className="topbar-filter">
        <p>
          Found <span>{total} movies</span> in total
        </p>
        <label>Sort by:</label>
        <select value={sort} onChange={handleSortChange}>
          <option value="popularity-desc">Popularity Descending</option>
          <option value="popularity-asc">Popularity Ascending</option>
          <option value="rating-desc">Rating Descending</option>
          <option value="rating-asc">Rating Ascending</option>
          <option value="date-desc">Release date Descending</option>
          <option value="date-asc">Release date Ascending</option>
        </select>
        <a href="#" className="list">
          <i className="ion-ios-list-outline"></i>
        </a>
        <a href="#" className="grid">
          <i className="ion-grid active"></i>
        </a>
      </div>

      {/* Movie list */}
      <div className="flex-wrap-movielist">
        {movies.map((movie) => (
          <MovieGridItemComponent key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="topbar-filter">
        <label>Movies per page:</label>
        <select value={perPage} onChange={handlePerPageChange}>
          <option value="20">20 Movies</option>
          <option value="12">12 Movies</option>
          <option value="8">8 Movies</option>
        </select>

        <div className="pagination2">
          <span>
            Page {page} of {totalPages}:
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <a
              key={i + 1}
              className={page === i + 1 ? "active" : ""}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i + 1);
              }}
            >
              {i + 1}
            </a>
          ))}
          {page < totalPages && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
            >
              <i className="ion-arrow-right-b"></i>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieGridComponent;
