import MovieSectionComponent from "../../layouts/movie-section/movie-section.component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrailerSectionComponent from "../../layouts/trailer-section/trailer-section.component";
import OutstandingMovieSectionComponent from "../../layouts/out-standing-movie-section/out-standing-movie-section.component";
import PreloaderComponent from "../../components/preloader/preloader.component";
import { useMovies } from "../../hooks/use-movies"; // 👈 import hook
import { useEffect, useState, useMemo } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  // gọi API: page=1, pageSize=8, type="theater"
  const { data: theaterMovies, isLoading: isLoadingTheater } = useMovies(1, 8, undefined, "theater");
  const { data: tvMovies, isLoading: isLoadingTv } = useMovies(1, 8, undefined, "tv");

  useEffect(() => {
    if (!isLoadingTheater && !isLoadingTv) {
      setLoading(false);
    }
  }, [isLoadingTheater, isLoadingTv]);



  // ✅ convert từ API data -> format tabs
  const theaterTabs = useMemo(() => [
    {
      id: "tab1",
      label: "#Popular",
      movies: theaterMovies?.data.map(m => ({
        id: m.id,
        title: m.title,
        poster: m.posterUrl ?? "images/uploads/default.jpg",
        rating: m.ratings ?? 0,
      })) ?? [],
    }
  ], [theaterMovies]);

  const tvTabs = useMemo(() => [
    {
      id: "tab2",
      label: "#On TV",
      movies: tvMovies?.data.map(m => ({
        id: m.id,
        title: m.title,
        poster: m.posterUrl ?? "images/uploads/default.jpg",
        rating: m.ratings ?? 0,
      })) ?? [],
    }
  ], [tvMovies]);

  // Dữ liệu khác (mock tạm thời, có thể gọi API sau)
  const videos = [
    "https://www.youtube.com/embed/1Q8fG0TtVAY",
    "https://www.youtube.com/embed/w0qQkSuWOS8",
  ];
  const trailers = [
    { image: "images/uploads/trailer7.jpg", title: "Wonder Woman", duration: "2:30" },
  ];
  const celebrities = [
    { name: "Samuel N. Jack", role: "Actor", image: "images/uploads/ava1.jpg" },
  ];
  const moviesOutStanding = [
    { title: "Guardians of the Galaxy", year: "2015", rating: 7.4, runtime: "2h21’", rated: "PG-13", release: "1 May 2015", poster: "/images/uploads/poster1.jpg", genres: ["Sci-fi", "Action", "Adventure"] },
  ];
  if (loading) return <PreloaderComponent />;
  return (
    <>
      <OutstandingMovieSectionComponent movies={moviesOutStanding} />
      <MovieSectionComponent title="in theater" tabs={theaterTabs} />
      <MovieSectionComponent title="on tv" tabs={tvTabs} />
      <TrailerSectionComponent videos={videos} trailers={trailers} celebrities={celebrities} />
    </>
  );
}
