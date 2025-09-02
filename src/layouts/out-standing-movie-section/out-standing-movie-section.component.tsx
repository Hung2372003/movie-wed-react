import Slider from "react-slick";
import OutstandingMovieItemComponent from "../../components/outstanding-movie-item/outstanding-movie-item.component";

interface Movie {
  title: string;
  year: string;
  rating: number;
  runtime: string;
  rated: string;
  release: string;
  poster: string;
  genres: string[];
}

interface OutstandingMovieSliderProps {
  movies: Movie[];
}

const OutstandingMovieSectionComponent: React.FC<OutstandingMovieSliderProps> = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider sliderv2">
      <div className="container">
        <div className="row">
          <Slider {...settings} className="slider-single-item">
            {movies.map((movie, index) => (
              <OutstandingMovieItemComponent key={index} {...movie} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OutstandingMovieSectionComponent;
