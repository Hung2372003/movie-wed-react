import MovieSectionComponent from "../../layouts/movie-section/movie-section.component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrailerSectionComponent from "../../layouts/trailer-section/trailer-section.component";
import OutstandingMovieSectionComponent from "../../layouts/out-standing-movie-section/out-standing-movie-section.component";
import PreloaderComponent from "../../components/preloader/preloader.component";
import { useMovies } from "../../hooks/use-movies"; // 👈 import hook
import { useEffect, useState, useMemo } from "react";
import { MoviesApi, RatingsApi } from "../../api/end-point.api";
import type { Movie } from "../../types/api-response.interface";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  // gọi API: page=1, pageSize=8, type="theater"
  const { data: theaterMovies, isLoading: isLoadingTheater } = useMovies(1, 8, undefined, "Movie");
  const { data: tvMovies, isLoading: isLoadingTv } = useMovies(1, 8, undefined, "TVSeries");
  const { data: moviesOutStanding, isLoading: isLoadingOutStandung } = useMovies(1, 8, undefined, "Outstanding");
  const [viewTrailer, setViewTrailer] = useState<Movie[]>([]);


useEffect(() => {
  const fetchRatings = async () => {
    if (!isLoadingTheater && !isLoadingTv && !isLoadingOutStandung) {
      try {
        if (moviesOutStanding?.data) {
          const moviesWithRatings = await Promise.all(
            moviesOutStanding.data.map(async (movie) => {
              try {
                let ratingRes = await RatingsApi.getAverageRating(movie.id);
                return { ...movie, averageRating: ratingRes.data.average };
              } catch (err) {
                console.error("Lỗi khi load rating:", err);
                return { ...movie, averageRating: null };
              }
            })
          );

          // ✅ setMovies 1 lần thôi
          // setMovies(moviesWithRatings);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  fetchRatings();
}, [isLoadingTheater, isLoadingTv, isLoadingOutStandung, moviesOutStanding]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await MoviesApi.getAll();
        setViewTrailer(data.data.data.slice(0, 20)); // Lấy 20 phim đầu tiên để hiển thị trailer
      } catch (err) {

      }
    };
    fetchData();
  }, [theaterMovies, tvMovies, moviesOutStanding]);

  // ✅ convert từ API data -> format tabs
  const theaterTabs = useMemo(() => [
    {
      id: "tab1",
      label: "#Movie",
      movies: theaterMovies?.data.map(m => ({
        id: m.id,
        title: m.title,
        poster: m.posterUrl ?? "images/uploads/default.jpg",
        rating: m.averageRating ?? 0,
      })) ?? [],
    }
  ], [theaterMovies]);

  const tvTabs = useMemo(() => [
    {
      id: "tab2",
      label: "#TV Series",
      movies: tvMovies?.data.map(m => ({
        id: m.id,
        title: m.title,
        poster: m.posterUrl ?? "images/uploads/default.jpg",
        rating: m.averageRating ?? 0,
      })) ?? [],
    }
  ], [tvMovies]);


  const celebrities = [
    { name: "Samuel N. Jack", role: "Actor", image: "images/uploads/ava1.jpg" },
  ];

  if (loading) return <PreloaderComponent />;
  return (
    <>
      <OutstandingMovieSectionComponent movies={moviesOutStanding?.data.map(cast =>({
        id: cast.id,
        title: cast.title,
        year: cast.releaseYear?.toString() ?? "2023",
        rating: cast.averageRating ?? 0,
        runtime: cast.duration ? `${cast.duration} min` : "N/A",
        rated: cast.type ?? "N/A",
        release: cast.releaseYear ? cast.releaseYear.toString() : "N/A",
        poster: cast.posterUrl ?? "images/uploads/default.jpg",
        genres: [],
      })) ?? []} />
      <MovieSectionComponent title="Movie" tabs={theaterTabs} />
      <MovieSectionComponent title="TV Serier" tabs={tvTabs} />
      <TrailerSectionComponent movies={viewTrailer} celebrities={celebrities} />
    </>
  );
}
