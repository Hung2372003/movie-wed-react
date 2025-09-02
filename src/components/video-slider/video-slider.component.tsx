import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import TrailerItem from "../trailer-item/trailer-item.component";

interface VideoSliderProps {
  videos: string[];
  trailers: { image: string; title: string; duration: string }[];
}

const VideoSlider: React.FC<VideoSliderProps> = ({ videos, trailers }) => {
  const mainSlider = useRef<Slider | null>(null);
  const navSlider = useRef<Slider | null>(null);

  // state để đồng bộ slider
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
  };

  const navSettings: Settings = {
    asNavFor: nav1 ?? undefined,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    centerMode: false,
    vertical: true,        // 👈 hàng dọc
    verticalSwiping: true, // 👈 cho phép swipe dọc
  };

  return (
    <div className="videos">
      {/* Slider chính hiển thị video */}
      <Slider {...mainSettings} ref={mainSlider} className="slider-for-2 video-ft">
        {videos.map((video, idx) => (
          <div key={idx}>
            <iframe
              className="item-video"
              src={video}
              title={`video-${idx}`}
              width="100%"
              height="400"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </Slider>

      {/* Slider thumbnail */}
      <Slider {...navSettings} ref={navSlider} className="slider-nav-2 thumb-ft">
        {trailers.map((trailer, idx) => (
          <TrailerItem
            key={idx}
            image={trailer.image}
            title={trailer.title}
            duration={trailer.duration}
          />
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlider;
