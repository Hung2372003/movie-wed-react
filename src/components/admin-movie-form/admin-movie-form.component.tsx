import { useEffect, useState } from "react";
import type { MovieAdmin } from "../../types/admin-movie.interface";
import "./admin-movie-form.scss";

interface Props {
  editingMovie: MovieAdmin | null;
  onSubmit: (movie: MovieAdmin) => void;
  onClose: () => void;
}

export default function AdminMovieForm({ editingMovie, onSubmit, onClose }: Props) {
  const [form, setForm] = useState<MovieAdmin>({
    id: 0,
    title: "",
    description: "",
    type: "",
    director:"",
    duration:0,
    releaseYear: new Date().getFullYear(),
    country: "",
    posterUrl: "",
    trailerUrl: "",
    posterFile: undefined,
    trailerFile: undefined,
  });

  useEffect(() => {
    if (editingMovie) {
      setForm({
        ...editingMovie,
        posterFile: undefined,
        trailerFile: undefined,
      });
    }
  }, [editingMovie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm({
      ...form,
      posterFile: file,
      posterUrl: file ? URL.createObjectURL(file) : "",
    });
  };

  const handleTrailerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm({
      ...form,
      trailerFile: file,
      trailerUrl: file ? URL.createObjectURL(file) : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <h3 className="form-title">{editingMovie ? "✏️ Edit Movie" : "➕ Add New Movie"}</h3>

      <div className="form-group">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Type</label>
        <input name="type" value={form.type} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Director</label>
        <input name="director" value={form.director} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Duration</label>
        <input name="duration" value={form.duration} onChange={handleChange} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={form.releaseYear}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input name="country" value={form.country} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label>Poster</label>
        <input type="file" accept="image/*" onChange={handlePosterChange} />
        {form.posterUrl && <img src={form.posterUrl} alt="Poster" className="poster-preview" />}
      </div>

      <div className="form-group">
        <label>Trailer</label>
        <input type="file" accept="video/*" onChange={handleTrailerChange} />
        {form.trailerUrl && <video src={form.trailerUrl} controls className="trailer-preview" />}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-success">{editingMovie ? "Update" : "Add"}</button>
        <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
