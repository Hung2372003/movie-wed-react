import { useEffect, useState } from "react";
import MovieDetail from "../../components/movie-detail/movide-detail.component";
import { useParams } from "react-router-dom";
import { MoviesApi } from "../../api/end-point.api";
import type { Movie } from "../../types/api-response.interface";
import PreloaderComponent from "../../components/preloader/preloader.component";

export default function MovieDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
     useEffect(() => {
        if (!id) return;
            const fetchMovie = async () => {
            try {
                const res = await MoviesApi.getById(Number(id));
                setMovie(res.data); 
            } catch (err) {
                console.error("Lỗi khi load movie:", err);
            } finally {
                setLoading(false);
            }
            };
        fetchMovie();
    }, [id]);
    if (loading) return <PreloaderComponent />;
    if (!movie) return <div>Không tìm thấy phim</div>;
  return (
    <>

        <div className="hero mv-single-hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    
                    </div>
                </div>
            </div>
        </div>
      <MovieDetail
            id={movie.id}
            title={movie.title}
            year={movie.releaseYear ?? 2023}
            posterUrl={movie.posterUrl ?? "images/uploads/default.jpg"}
            trailerUrl={movie.trailerUrl ?? "https://www.youtube.com/embed/1Q8fG0TtVAY"}
            buyTicketUrl="#"
            description={movie.description ?? "No description available."}
            rating={typeof movie.ratings === "number" ? movie.ratings : 0}
            reviewsCount={movie.comments ? movie.comments.length : 0}
            director={[movie.director ?? "Unknown Director"]}
            writer={["Joss Whedon", "Stan Lee"]}
            stars={["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]}
            genres={["Action", "Sci-Fi", "Adventure"]}
            releaseDate=""
            runtime={movie.duration ? `${movie.duration} min` : "N/A"}
            mmpaRating={movie.type}
            plotKeywords={["superhero", "marvel universe", "comic", "blockbuster"]}
            casts={[]}
            reviews={[
                {
                title: "",
                rating: 10,
                author: "hawaiipierson",
                date: "17 December 2016",
                content: "This is by far one of my favorite movies..."
                }
            ]}
            />

    </>
    
);

}