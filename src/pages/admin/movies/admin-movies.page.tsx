import { useState, useEffect } from "react";
import AdminMovieForm from "../../../components/admin-movie-form/admin-movie-form.component";
import AdminMovieTable from "../../../components/admin-movie-table/admin-movie-table.component";
import Modal from "../../../components/common/modal.component";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb.component";
import "./admin-movies.page.scss";
import type { MovieAdmin } from "../../../types/admin-movie.interface";
import type { Movie } from "../../../types/api-response.interface";
import { useMovies, useCreateMovie, useUpdateMovie, useDeleteMovie } from "../../../hooks/use-movies";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminMoviesPage() {
  const [editingMovie, setEditingMovie] = useState<MovieAdmin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moviesAdmin, setMoviesAdmin] = useState<MovieAdmin[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  // --- React Query hooks ---
  const { data, isLoading: isMoviesLoading } = useMovies();
  const createMutation = useCreateMovie();
  const updateMutation = useUpdateMovie();
  const deleteMutation = useDeleteMovie();

  const isCreating = createMutation.status === "pending";
  const isUpdating = updateMutation.status === "pending";
  const isDeleting = deleteMutation.status === "pending";

  // --- Map API Movie -> MovieAdmin ---
  useEffect(() => {
    if (data?.data) {
      const mapped: MovieAdmin[] = data.data.map((m: Movie) => ({
        id: m.id,
        title: m.title,
        description: m.description || "",
        type: m.type || "",
        releaseYear: m.releaseYear ?? 0,
        country: m.country ?? "",
        posterUrl: m.posterUrl || "",
        trailerUrl: m.trailerUrl || "",
        director: m.director || "",
        duration: m.duration || 0,
      }));
      setMoviesAdmin(mapped);
    }
  }, [data]);

  // --- Handlers ---
  const handleAddOrUpdate = (movie: MovieAdmin) => {
    const formData = new FormData();
    formData.append("title", movie.title);
    formData.append("description", movie.description || "");
    formData.append("type", movie.type);
    formData.append("director", movie.director || "");
    formData.append("duration", movie.duration?.toString() ?? "0");
    formData.append("releaseYear", movie.releaseYear.toString());
    formData.append("country", movie.country);
    if (movie.posterFile) formData.append("poster", movie.posterFile);
    if (movie.trailerFile) formData.append("trailer", movie.trailerFile);
    setLoadingAction(true);
    if (editingMovie) {
      updateMutation.mutate(
        { id: movie.id, data: formData },
        {
          onSuccess: () =>
            {
              toast.success("Movie updated successfully!");
              setLoadingAction(false);
            },
          onError: () => {
            toast.error("Failed to update movie.");
            setLoadingAction(false);
          }
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Movie created successfully!");
           setLoadingAction(false);
        },
        onError: () => {
          toast.error("Failed to create movie.");
           setLoadingAction(false);
        }
      });
    }

    setEditingMovie(null);
    setIsModalOpen(false);
  };

  const handleEdit = (movie: MovieAdmin) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

const handleDelete = (id: number) => {
  setDeletingId(id);
  deleteMutation.mutate(id, {
    onSuccess: () => {
      toast.success("Movie deleted successfully!");
      setDeletingId(null);
    },
    onError: () => {
      toast.error("Failed to delete movie.");
      setDeletingId(null);
    },
  });
};

  if (isMoviesLoading) return <div>Loading movies...</div>;

  return (
    <div className="admin-movies-page">
      <Breadcrumb />

      <div className="page-header">
        <h1>🎬 Admin Movie Management</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setEditingMovie(null);
            setIsModalOpen(true);
          }}
          disabled={isCreating || isUpdating}
        >
          {isCreating || isUpdating ? "Processing..." : "➕ Add Movie"}
        </button>
      </div>

     <AdminMovieTable
        movies={moviesAdmin}
        onEdit={handleEdit}
        onDelete={handleDelete}
        // editingId={editingMovie?.id}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AdminMovieForm
          onSubmit={handleAddOrUpdate}
          editingMovie={editingMovie}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
