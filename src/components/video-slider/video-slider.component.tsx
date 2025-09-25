import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import TrailerItem from "../trailer-item/trailer-item.component";

// Kiểu dữ liệu cho 1 phim
interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string;
  duration: number;
}

interface VideoSliderProps {
  movies: Movie[]; // 👈 Nhận trực tiếp array phim từ API
}

const VideoSlider: React.FC<VideoSliderProps> = ({ movies }) => {
  const mainSlider = useRef<Slider | null>(null);
  const navSlider = useRef<Slider | null>(null);

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  useEffect(() => {
    setNav1(mainSlider.current);
    setNav2(navSlider.current);
  }, []);

  const mainSettings: Settings = {
    asNavFor: nav2 ?? undefined,
    arrows: false,
    fade: true,
    infinite: true,
  };

  const navSettings: Settings = {
    asNavFor: nav1 ?? undefined,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    centerMode: false,
    vertical: true,
    verticalSwiping: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 768, // mobile: thumbnail nằm ngang
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="videos">
      {/* Slider chính hiển thị trailer */}
      <Slider {...mainSettings} ref={mainSlider} className="slider-for-2 video-ft">
        {movies.map((movie) => (
          <div key={movie.id}>
            <video
              className="item-video"
              src={movie.trailerUrl}
              controls
              width="100%"
              height="400"
            />
          </div>
        ))}
      </Slider>

      {/* Slider thumbnail */}
      <Slider {...navSettings} ref={navSlider} className="slider-nav-2 thumb-ft">
        {movies.map((movie) => (
          <TrailerItem
            key={movie.id}
            image={movie.posterUrl}
            title={movie.title}
            duration={`${movie.duration} min`}
          />
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlider;
