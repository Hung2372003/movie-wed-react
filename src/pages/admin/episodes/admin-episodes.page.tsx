import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { EpisodeAdmin } from "../../../types/episode-admin.interface";
import AdminEpisodeForm from "../../../components/admin-episode/admin-episode-form/admin-episode-form.component";
import AdminEpisodeTable from "../../../components/admin-episode/admin-episode-table/admin-episode-table.component";
import Modal from "../../../components/common/modal.component";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb.component";
import { EpisodesApi } from "../../../api/end-point.api";
import "./admin-episodes-page.scss";

export default function AdminEpisodesPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [episodes, setEpisodes] = useState<EpisodeAdmin[]>([]);
  const [editingEpisode, setEditingEpisode] = useState<EpisodeAdmin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load danh sách episodes khi mở trang
  useEffect(() => {

      EpisodesApi.getAllEpisode()
        .then((res) => setEpisodes(res.data))
        .catch((err) => console.error("Load episodes failed:", err));

  }, [movieId]);

  // Thêm hoặc cập nhật episode
  const handleAddOrUpdate = async (episode: EpisodeAdmin) => {
    try {
      if (editingEpisode) {
        // Update
        const res = await EpisodesApi.update(episode.id, episode);
        setEpisodes((prev) =>
          prev.map((e) => (e.id === episode.id ? res.data : e))
        );
        setEditingEpisode(null);
      } else if (episode.movieId) {
        // Create
        const res = await EpisodesApi.create(Number(episode.movieId), episode);
        setEpisodes((prev) => [...prev, res.data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // Edit
  const handleEdit = (episode: EpisodeAdmin) => {
    setEditingEpisode(episode);
    setIsModalOpen(true);
  };

  // Delete
  const handleDelete = async (id: number) => {
    try {
      await EpisodesApi.delete(id);
      setEpisodes((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
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

      <AdminEpisodeTable
        episodes={episodes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
