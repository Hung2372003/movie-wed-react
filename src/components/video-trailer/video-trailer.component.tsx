import React from "react";

interface Props {
  url: string;
}

const VideoTrailerComponent: React.FC<Props> = ({ url }) => {
  return (
    <div className="slider-for-2 video-ft">
      <iframe
        className="item-video"
        src={url}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoTrailerComponent;
