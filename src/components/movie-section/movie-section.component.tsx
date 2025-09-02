import React, { useState } from "react";
import Slider from "react-slick";
import MovieItemComponent from "../movie-item/movie-item.component";

type Movie = {
  id: number;
  title: string;
  poster: string;
  rating: number;
};

type TabData = {
  id: string;
  label: string;
  movies: Movie[];
};

interface MovieSectionProps {
  title: string; // ví dụ: "in theater" hay "on tv"
  tabs: TabData[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const sliderSettings = {
    dots: true,                // hiện dots
    infinite: false,           // không lặp vô hạn (thường dùng cho list phim)
    speed: 500,                // tốc độ trượt
    slidesToShow: 6,           // số item hiển thị trên 1 trang
    slidesToScroll: 1,         // số item trượt khi click
    arrows: true,              // hiện nút điều hướng
    responsive: [
      {
        breakpoint: 1024,      // màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,       // tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,       // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="movie-items  full-width">
      <div className="row">
        <div className="col-md-12">
          {/* Title */}
          <div className="title-hd">
            <h2>{title}</h2>
            <a href="#" className="viewall">
              View all <i className="ion-ios-arrow-right"></i>
            </a>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <ul className="tab-links">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={activeTab === tab.id ? "active" : ""}
                >
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab.id);
                    }}
                  >
                    {tab.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  id={tab.id}
                  className={`tab ${activeTab === tab.id ? "active" : ""}`}
                >
                  <div className="row">
                    <Slider {...sliderSettings} className="slick-multiItem2">
                      {tab.movies.map((movie) => (
                        <div key={movie.id} className="slide-it">
                          <MovieItemComponent
                            title={movie.title}
                            poster={movie.poster}
                            rating={movie.rating}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
