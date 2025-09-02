import React from "react";
import VideoSlider from "../../components/video-slider/video-slider.component";
import CelebrityItem from "../../components/celebrity-item/celebrity-item.component";

interface TrailerSectionProps {
  videos: string[];
  trailers: { image: string; title: string; duration: string }[];
  celebrities: { name: string; role: string; image: string }[];
}

const TrailerSection: React.FC<TrailerSectionProps> = ({ videos, trailers, celebrities }) => {
  return (
    <div className="trailers full-width">
      <div className="row ipad-width">
        {/* Left */}
        <div className="col-md-9 col-sm-12 col-xs-12">
          <div className="title-hd">
            <h2>in theater</h2>
            <a href="#" className="viewall">
              View all <i className="ion-ios-arrow-right"></i>
            </a>
          </div>

          {/* Slider */}
          <VideoSlider videos={videos} trailers={trailers} />
        </div>

        {/* Right */}
        <div className="col-md-3 col-sm-12 col-xs-12">
          <div className="sidebar">
            <div className="celebrities">
              <h4 className="sb-title">Spotlight Celebrities</h4>
              {celebrities.map((celeb, idx) => (
                <CelebrityItem
                  key={idx}
                  name={celeb.name}
                  role={celeb.role}
                  image={celeb.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerSection;
