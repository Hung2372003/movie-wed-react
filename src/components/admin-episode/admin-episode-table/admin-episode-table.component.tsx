import type { EpisodeAdmin } from "../../../types/episode-admin.interface";
import "./admin-episode-table.scss";

interface Props {
  episodes: EpisodeAdmin[];
  onEdit: (episode: EpisodeAdmin) => void;
  onDelete: (id: number) => void;
}

export default function AdminEpisodeTable({ episodes, onEdit, onDelete }: Props) {
  return (
    <table className="admin-episode-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Video</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {episodes.map((ep) => (
          <tr key={ep.id}>
            <td>{ep.episodeNumber}</td>
            <td>{ep.title}</td>
            <td>
              {ep.videoUrl ? (
                <video src={ep.videoUrl} width="150" controls />
              ) : (
                "N/A"
              )}
            </td>
            <td>
              <button onClick={() => onEdit(ep)}>Edit</button>
              <button onClick={() => onDelete(ep.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
