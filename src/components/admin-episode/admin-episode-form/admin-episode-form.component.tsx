import { useEffect, useState } from "react";
import type { EpisodeAdmin } from "../../../types/episode-admin.interface";
import "./admin-episode-form.scss";

interface Props {
  editingEpisode: EpisodeAdmin | null;
  onSubmit: (episode: EpisodeAdmin) => void;
  onClose: () => void;
}

export default function AdminEpisodeForm({ editingEpisode, onSubmit, onClose }: Props) {
  const [form, setForm] = useState<EpisodeAdmin>({
    id: 0,
    movieId: 1, // giả sử quản lý cho movieId=1 trước
    episodeNumber: 1,
    title: "",
    videoUrl: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    if (editingEpisode) {
      setForm(editingEpisode);
      setVideoFile(null);
    }
  }, [editingEpisode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "episodeNumber" ? Number(value) : value });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
    if (file) {
      setForm({ ...form, videoUrl: URL.createObjectURL(file) });
    }
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const episode = editingEpisode
    ? { ...form, id: editingEpisode.id, video: videoFile ?? undefined }
    : { ...form, id: Date.now(), video: videoFile ?? undefined };

  onSubmit(episode as EpisodeAdmin & { video?: File });
  onClose();
};
  return (
    <form className="admin-episode-form" onSubmit={handleSubmit}>
      <h3>{editingEpisode ? "✏️ Edit Episode" : "➕ Add New Episode"}</h3>

        <label >Movie ID</label>
        <input
          type="number"
          name="movieId"
          value={form.movieId}
          onChange={handleChange}
          placeholder="Movie ID"
          required
      />
       <label >Episode Number</label>
      <input
        type="number"
        name="episodeNumber"
        value={form.episodeNumber}
        onChange={handleChange}
        placeholder="Episode Number"
        required
      />
      <label>Title:</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <label>Video:</label>
      <input type="file" accept="video/*" onChange={handleVideoChange} />

      {form.videoUrl && (
        <video src={form.videoUrl} controls width="300" style={{ marginTop: 10 }} />
      )}

      <div className="form-actions">
        <button type="submit">{editingEpisode ? "Update" : "Add"}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
