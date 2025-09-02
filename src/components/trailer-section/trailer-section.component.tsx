import React, { useRef } from "react";
import Slider from "react-slick";

const videoData = [
  { src: "https://www.youtube.com/embed/1Q8fG0TtVAY", title: "Wonder Woman", thumb: "images/uploads/trailer7.jpg", duration: "2:30" },
  { src: "https://www.youtube.com/embed/w0qQkSuWOS8", title: "Oblivion: Official Teaser Trailer", thumb: "images/uploads/trailer2.jpg", duration: "2:37" },
  { src: "https://www.youtube.com/embed/44LdLqgOpjo", title: "Exclusive Interview: Skull Island", thumb: "images/uploads/trailer6.jpg", duration: "2:44" },
  { src: "https://www.youtube.com/embed/gbug3zTm3Ws", title: "Logan: Director James Mangold Interview", thumb: "images/uploads/trailer3.png", duration: "2:43" },
  { src: "https://www.youtube.com/embed/e3Nl_TCQXuw", title: "Beauty and the Beast: Teaser 2", thumb: "images/uploads/trailer4.png", duration: "2:32" },
  { src: "https://www.youtube.com/embed/NxhEZG0k9_w", title: "Fast & Furious 8", thumb: "images/uploads/trailer5.jpg", duration: "3:11" },
];

const celebs = [
  { name: "Samuel N. Jack", role: "Actor", img: "images/uploads/ava1.jpg" },
  { name: "Benjamin Carroll", role: "Actor", img: "images/uploads/ava2.jpg" },
  { name: "Beverly Griffin", role: "Actor", img: "images/uploads/ava3.jpg" },
  { name: "Justin Weaver", role: "Actor", img: "images/uploads/ava4.jpg" },
];

const VideoSlider = ({ navRef }: { navRef: React.RefObject<Slider | null> }) => {
  const settings = {
    arrows: false,
    asNavFor: navRef.current as Slider | undefined,
    ref: (slider: Slider) => {},
  };

  return (
    <Slider {...settings} className="slider-for-2 video-ft">
      {videoData.map((video, i) => (
        <div key={i}>
          <iframe
            className="item-video"
            src={video.src}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </Slider>
  );
};

const ThumbSlider = ({ mainRef }: { mainRef: React.RefObject<Slider | null> }) => {
  const settings = {
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: mainRef.current as Slider | undefined,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings} className="slider-nav-2 thumb-ft">
      {videoData.map((video, i) => (
        <div className="item" key={i}>
          <div className="trailer-img">
            <img src={video.thumb} alt={video.title} />
          </div>
          <div className="trailer-infor">
            <h4 className="desc">{video.title}</h4>
            <p>{video.duration}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

const Celebrities = () => (
  <div className="celebrities">
    <h4 className="sb-title">Spotlight Celebrities</h4>
    {celebs.map((c, i) => (
      <div className="celeb-item" key={i}>
        <a href="#">
          <img src={c.img} alt={c.name} width="70" height="70" />
        </a>
        <div className="celeb-author">
          <h6>
            <a href="#">{c.name}</a>
          </h6>
          <span>{c.role}</span>
        </div>
      </div>
    ))}
  </div>
);

const TrailersSection = () => {
  const videoRef = useRef<Slider>(null);
  const thumbRef = useRef<Slider>(null);

  return (
    <div className="trailers full-width">
      <div className="row ipad-width">
        <div className="col-md-9 col-sm-12 col-xs-12">
          <div className="title-hd">
            <h2>in theater</h2>
            <a href="#" className="viewall">
              View all <i className="ion-ios-arrow-right"></i>
            </a>
          </div>
          <div className="videos">
            <VideoSlider navRef = {thumbRef} />
            <ThumbSlider mainRef={videoRef} />
          </div>
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="sidebar">
            <Celebrities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailersSection;
