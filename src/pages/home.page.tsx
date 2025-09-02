import HeaderComponent from "../components/header.component";
import OutstandingMovieItemComponent from "../components/outstanding-movie-item/outstanding-movie-item.component";
import Slider from "react-slick";
import MovieSectionComponent from "../components/movie-section/movie-section.component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrailerSectionComponent from "../components/trailer-section/trailer-section.component";;
export default function HomePage() {

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

  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 768, // dưới 768px (tablet, mobile)
      settings: {
        arrows: false, // tắt mũi tên
        dots: true,    // vẫn giữ dots
      },
    },
  ],
};
  return (
    <>
      <HeaderComponent />
       <div className="slider sliderv2">
          <div className="container">
            <div className="row">
              <Slider {...settings} className="slider-single-item">
                <OutstandingMovieItemComponent
                  title="Guardians of the Galaxy"
                  year="2015"
                  rating={7.4}
                  runtime="2h21’"
                  rated="PG-13"
                  release="1 May 2015"
                  poster="/images/uploads/poster1.jpg"
                  genres={["Sci-fi", "Action", "Adventure"]}
                />
                <OutstandingMovieItemComponent
                  title="Avengers: Endgame"
                  year="2019"
                  rating={8.4}
                  runtime="3h2’"
                  rated="PG-13"
                  release="26 Apr 2019"
                  poster="/images/uploads/poster1.jpg"
                  genres={["Action", "Sci-fi", "Drama"]}
                />
              </Slider>
            </div>
          </div>
        </div>
        <MovieSectionComponent title="in theater" tabs={theaterTabs} />
        <MovieSectionComponent title="on tv" tabs={tvTabs} />
        <TrailerSectionComponent />
    </>
  );
}
