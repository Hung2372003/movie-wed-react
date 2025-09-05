import { useState } from "react";
import type { EpisodeAdmin } from "../../../types/episode-admin.interface";
import AdminEpisodeForm from "../../../components/admin-episode/admin-episode-form/admin-episode-form.component";
import AdminEpisodeTable from "../../../components/admin-episode/admin-episode-table/admin-episode-table.component";
import Modal from "../../../components/common/modal.component";
import "./admin-episodes-page.scss";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb.component";

const fakeEpisodes: EpisodeAdmin[] = [
  {
    id: 1,
    movieId: 1,
    episodeNumber: 1,
    title: "Episode 1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    movieId: 1,
    episodeNumber: 2,
    title: "Episode 2",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
  },
];

export default function AdminEpisodesPage() {
  const [episodes, setEpisodes] = useState<EpisodeAdmin[]>(fakeEpisodes);
  const [editingEpisode, setEditingEpisode] = useState<EpisodeAdmin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddOrUpdate = (episode: EpisodeAdmin) => {
    if (editingEpisode) {
      setEpisodes(episodes.map((e) => (e.id === episode.id ? episode : e)));
      setEditingEpisode(null);
    } else {
      setEpisodes([...episodes, episode]);
    }
  };

  const handleEdit = (episode: EpisodeAdmin) => {
    setEditingEpisode(episode);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setEpisodes(episodes.filter((e) => e.id !== id));
  };

  return (
      <div className="admin-episodes-page">
        <Breadcrumb />
        <h1>🎞️ Episode Management</h1>
        <button
          className="add-btn"
          onClick={() => {
            setEditingEpisode(null);
            setIsModalOpen(true);
          }}
        >
          ➕ Add Episode
        </button>

        <AdminEpisodeTable episodes={episodes} onEdit={handleEdit} onDelete={handleDelete} />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AdminEpisodeForm
            onSubmit={handleAddOrUpdate}
            editingEpisode={editingEpisode}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
  );
}
