
import MovieSectionComponent from "../layouts/movie-section/movie-section.component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrailerSectionComponent from "../layouts/trailer-section/trailer-section.component";
import OutstandingMovieSectionComponent from "../layouts/out-standing-movie-section/out-standing-movie-section.component";
import PreloaderComponent from "../components/preloader/preloader.component";
import { useEffect, useState } from "react";



export default function HomePage() {

    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     setLoading(false);
    //   }, 2000); 

    //   return () => clearTimeout(timer);
    // }, []);
    useEffect(() => {
      // Khi component App render xong lần đầu => ẩn preloader
      setLoading(false);
    }, []);
    if (loading) {
      return <PreloaderComponent />;
    }

   const theaterTabs = [
    {
      id: "tab1",
      label: "#Popular",
      movies: [
        { id: 1, title: "Interstellar", poster: "images/uploads/mv-it1.jpg", rating: 7.4 },
        { id: 2, title: "The Revenant", poster: "images/uploads/mv-it2.jpg", rating: 7.4 },
        { id: 3, title: "Die Hard", poster: "images/uploads/mv-it3.jpg", rating: 7.4 },
        { id: 4, title: "The Walk", poster: "images/uploads/mv-it4.jpg", rating: 7.4 },
         { id: 1, title: "Interstellar", poster: "images/uploads/mv-it1.jpg", rating: 7.4 },
        { id: 2, title: "The Revenant", poster: "images/uploads/mv-it2.jpg", rating: 7.4 },
        { id: 3, title: "Die Hard", poster: "images/uploads/mv-it3.jpg", rating: 7.4 },
        { id: 4, title: "The Walk", poster: "images/uploads/mv-it4.jpg", rating: 7.4 },
      ],
    },
    {
      id: "tab2",
      label: "#Coming soon",
      movies: [
        { id: 5, title: "Movie A", poster: "images/uploads/mv-it5.jpg", rating: 7.1 },
        { id: 6, title: "Movie B", poster: "images/uploads/mv-it6.jpg", rating: 6.8 },
         { id: 7, title: "Movie TV 1", poster: "images/uploads/mv-it7.jpg", rating: 7.9 },
        { id: 8, title: "Movie TV 2", poster: "images/uploads/mv-it8.jpg", rating: 8.2 },
         { id: 7, title: "Movie TV 1", poster: "images/uploads/mv-it7.jpg", rating: 7.9 },
        { id: 8, title: "Movie TV 2", poster: "images/uploads/mv-it8.jpg", rating: 8.2 },
      ],
    },
  ];

  const tvTabs = [
    {
      id: "tab21",
      label: "#Popular",
      movies: [
        { id: 7, title: "Movie TV 1", poster: "images/uploads/mv-it7.jpg", rating: 7.9 },
        { id: 8, title: "Movie TV 2", poster: "images/uploads/mv-it8.jpg", rating: 8.2 },
         { id: 7, title: "Movie TV 1", poster: "images/uploads/mv-it7.jpg", rating: 7.9 },
        { id: 8, title: "Movie TV 2", poster: "images/uploads/mv-it8.jpg", rating: 8.2 },
         { id: 7, title: "Movie TV 1", poster: "images/uploads/mv-it7.jpg", rating: 7.9 },
        { id: 8, title: "Movie TV 2", poster: "images/uploads/mv-it8.jpg", rating: 8.2 },
      ],
    },
  ];


const videos = [
  "https://www.youtube.com/embed/1Q8fG0TtVAY",
  "https://www.youtube.com/embed/w0qQkSuWOS8",
  "https://www.youtube.com/embed/44LdLqgOpjo",
  "https://www.youtube.com/embed/gbug3zTm3Ws",
  "https://www.youtube.com/embed/e3Nl_TCQXuw",
  "https://www.youtube.com/embed/NxhEZG0k9_w",
];

const trailers = [
  { image: "images/uploads/trailer7.jpg", title: "Wonder Woman", duration: "2:30" },
  { image: "images/uploads/trailer2.jpg", title: "Oblivion: Official Teaser Trailer", duration: "2:37" },
  { image: "images/uploads/trailer6.jpg", title: "Exclusive Interview: Skull Island", duration: "2:44" },
  { image: "images/uploads/trailer3.png", title: "Logan: Director James Mangold Interview", duration: "2:43" },
  { image: "images/uploads/trailer4.png", title: "Beauty and the Beast: Official Teaser Trailer 2", duration: "2:32" },
  { image: "images/uploads/trailer5.jpg", title: "Fast&Furious 8", duration: "3:11" },
];

const celebrities = [
  { name: "Samuel N. Jack", role: "Actor", image: "images/uploads/ava1.jpg" },
  { name: "Benjamin Carroll", role: "Actor", image: "images/uploads/ava2.jpg" },
  { name: "Beverly Griffin", role: "Actor", image: "images/uploads/ava3.jpg" },
  { name: "Justin Weaver", role: "Actor", image: "images/uploads/ava4.jpg" },
];
const moviesOutStanding = [
  { title: "Guardians of the Galaxy", year: "2015", rating: 7.4, runtime: "2h21’", rated: "PG-13", release: "1 May 2015", poster: "/images/uploads/poster1.jpg", genres: ["Sci-fi", "Action", "Adventure"],},
  { title: "Avengers: Endgame", year: "2019", rating: 8.4, runtime: "3h2’", rated: "PG-13", release: "26 Apr 2019", poster: "/images/uploads/poster1.jpg", genres: ["Action", "Sci-fi", "Drama"],},
];
  return (
    <>
        <OutstandingMovieSectionComponent movies={moviesOutStanding} />
        <MovieSectionComponent title="in theater" tabs={theaterTabs} />
        <MovieSectionComponent title="on tv" tabs={tvTabs} />
        <TrailerSectionComponent videos={videos} trailers={trailers} celebrities={celebrities} />
    </>
  );
}
