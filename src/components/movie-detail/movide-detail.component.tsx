import React, { useEffect } from "react";
import StickySidebar from "../common/sticky-sidebar.component";
import { FavoritesApi, RatingsApi } from "../../api/end-point.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface Cast {
  name: string;
  role: string;
  image: string;
}

interface Review {
  title: string;
  rating: number;
  author: string;
  date: string;
  content: string;
}

interface MovieDetailProps {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  trailerUrl: string;
  buyTicketUrl?: string;
  description: string;
  rating: number;
  reviewsCount: number;
  director: string[];
  writer: string[];
  stars: string[];
  genres: string[];
  releaseDate: string;
  runtime: string;
  mmpaRating: string;
  plotKeywords: string[];
  casts: Cast[];
  reviews: Review[];
}

const MovieDetail: React.FC<MovieDetailProps> = ({
  id,
  title,
  year,
  posterUrl,
  trailerUrl,
  description,
  rating,
  reviewsCount,
  director,
  writer,
  stars,
  genres,
  releaseDate,
  runtime,
  mmpaRating,
  // plotKeywords,
  casts,
  reviews,
}) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = React.useState<number | null>(null);
  const useAddFavorite = async () => {
    try {
      await FavoritesApi.add(id);
       toast.success("Đã thêm vào mục yêu thích");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.success("Đã thêm vào mục yêu thích");
    }
  }
  useEffect(() => {
    const fetchRating = async () => {
      try {
        let ratingRes = await RatingsApi.getAverageRating(id);
        setAverageRating(ratingRes.data.average);

      } catch (err) {
        console.error("Lỗi khi load movie:", err);
      }
    };
    fetchRating();
  }, [id]);
  return (
    <div className="page-single movie-single movie_single">
      <div className="container">
        <div className="row ipad-width2">
          {/* Poster + buttons */}
          <div className="col-md-4 col-sm-12 col-xs-12">
            <StickySidebar>
            <div className="movie-img">
              <img src={posterUrl} alt={title} />
              <div className="movie-btn">
                <div onClick={() => navigate(`/movie-player/${id}`)} className="btn-transform transform-vertical red">
                  <div  >
                    <a className="item item-1 redbtn">
                      <i className="ion-play"></i> Watch
                    </a>
                  </div>
                </div>
                  <div onClick={() => navigate(`/movie-player/${id}`)} className="btn-transform transform-vertical">
                    <div>
                      <a href={`/movie-player/${id}`} className="item item-1 yellowbtn">
                        <i className="ion-card"></i> Trailler
                      </a>
                    </div>
                  </div>

              </div>
            </div>
            </StickySidebar>
          </div>

          {/* Movie details */}
          <div className="col-md-8 col-sm-12 col-xs-12">
            <div className="movie-single-ct main-content">
              <h1 className="bd-hd">
                {title} <span>{year}</span>
              </h1>
              <div className="social-btn">
                <div style={{ cursor: "pointer" }} onClick={() => useAddFavorite()}>
                   <a className="parent-btn" ><i className="ion-heart"></i> Add to Favorite</a>
                </div>

                <div className="hover-bnt">
                  <a href="#" className="parent-btn"><i className="ion-android-share-alt"></i>share</a>
                  <div className="hvr-item">
                    <a href="#" className="hvr-grow"><i className="ion-social-facebook"></i></a>
                    <a href="#" className="hvr-grow"><i className="ion-social-twitter"></i></a>
                    <a href="#" className="hvr-grow"><i className="ion-social-googleplus"></i></a>
                    <a href="#" className="hvr-grow"><i className="ion-social-youtube"></i></a>
                  </div>
                </div>
              </div>
              {/* Rating */}
              <div className="movie-rate">
                <div className="rate">
                  <i className="ion-android-star"></i>
                  <p>
                    <span>{averageRating}</span> /10
                    <br />
                    <span className="rv">{reviewsCount} Reviews</span>
                  </p>
                </div>
                <div className="rate-star">
                  <p>Rate This Movie:  </p>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                      (num <= (averageRating??0)) ? <i className="ion-ios-star" key={num}></i> : <i className="ion-ios-star-outline" key={num}></i>
                    ))}
                </div>
              </div>

              {/* Overview */}
              <div className="movie-tabs">
                <div className="tab-content">
                  <div id="overview" className="tab active">
                    <div className="row">
                      {/* Left content */}
                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <p>{description}</p>

                        {/* Cast */}
                        <div className="title-hd-sm">
                          <h4>Cast</h4>
                        </div>
                        <div className="mvcast-item">
                          {casts.map((c, idx) => (
                            <div className="cast-it" key={idx}>
                              <div className="cast-left">
                                <img src={c.image} alt={c.name} />
                                <a href="#">{c.name}</a>
                              </div>
                              <p>... {c.role}</p>
                            </div>
                          ))}
                        </div>

                        {/* Reviews */}
                        <div className="title-hd-sm">
                          <h4>User Reviews</h4>
                        </div>
                        {reviews.map((r, idx) => (
                          <div className="mv-user-review-item" key={idx}>
                            <h3>{r.title}</h3>
                            <div className="no-star">
                              {Array.from({ length: r.rating }).map((_, i) => (
                                <i key={i} className="ion-android-star"></i>
                              ))}
                            </div>
                            <p className="time">
                              {r.date} by <a href="#">{r.author}</a>
                            </p>
                            <p>{r.content}</p>
                          </div>
                        ))}
                      </div>

                      {/* Right sidebar */}
                      <div className="col-md-4 col-xs-12 col-sm-12">
                        <div className="sb-it">
                          <h6>Director: </h6>
                          <p>{director.join(", ")}</p>
                        </div>
                        <div className="sb-it">
                          <h6>Writer: </h6>
                          <p>{writer.join(", ")}</p>
                        </div>
                        <div className="sb-it">
                          <h6>Stars: </h6>
                          <p>{stars.join(", ")}</p>
                        </div>
                        <div className="sb-it">
                          <h6>Genres: </h6>
                          <p>{genres.join(", ")}</p>
                        </div>
                        <div className="sb-it">
                          <h6>Release Date:</h6>
                          <p>{releaseDate}</p>
                        </div>
                        <div className="sb-it">
                          <h6>Run Time:</h6>
                          <p>{runtime}</p>
                        </div>
                        <div className="sb-it">
                          <h6>MMPA Rating:</h6>
                          <p>{mmpaRating}</p>
                        </div>
                        {/* <div className="sb-it">
                          <h6>Plot Keywords:</h6>
                          <p className="tags">
                            {plotKeywords.map((k, i) => (
                              <span key={i} className="time">
                                <a href="#">{k}</a>
                              </span>
                            ))}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End movie-tabs */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
