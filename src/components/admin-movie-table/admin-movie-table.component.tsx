import { useState } from "react";
import type { MovieAdmin } from "../../types/admin-movie.interface";
import "./admin-movie-table.scss";

interface Props {
  movies: MovieAdmin[];
  onEdit: (movie: MovieAdmin) => void;
  onDelete: (id: number) => void;
  deletingId?: number | null;
  editingId?:number | null; // id movie đang xóa
}

export default function AdminMovieTable({ movies, onEdit, onDelete ,editingId: parentEditingId}: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const handleEdit = (movies:MovieAdmin) => {
    onEdit(movies);
  };
  const handleDelete = (id: number) => {
    setDeletingId(id);
    onDelete(id);
  };
  if (!movies.length) return <div>❌ No movies found.</div>;

  return (
    <div className="movie-table-container">
    <table className="movie-table">
      <thead>
        <tr>
          <th>Trailer</th>
          <th>Poster</th>
          <th>Title</th>
          <th>Type</th>
          <th>Director</th>
          <th>Duration</th>
          <th>Year</th>
          <th>Country</th>
          <th className="actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>  {movie.trailerUrl ? (
                <iframe src={movie.trailerUrl} className="trailer-iframe" />
              ) : (
                "N/A"
              )}</td>
            <td>
              {movie.posterUrl ? (
                <img src={movie.posterUrl} alt={movie.title} className="poster-img" />
              ) : (
                "N/A"
              )}
            </td>
            <td>{movie.title}</td>
            <td>{movie.type}</td>
            <td>{movie.director}</td>
            <td>{movie.duration} phút</td>
            <td>{movie.releaseYear}</td>
            <td>{movie.country}</td>
            <td className="actions">
              <button
                className="btn btn-edit"
                onClick={() => handleEdit(movie)}
                disabled={parentEditingId === movie.id}
              >
                {parentEditingId === movie.id ? "Editing..." : "Edit"}
              </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(movie.id)}
                disabled={deletingId === movie.id}
              >
                {deletingId === movie.id ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
