

interface OutstandingMovieItemComponentProps {
  id: number;             // ID phim
  title: string;          // Tên phim
  year: string;           // Năm phát hành
  rating: number;         // Điểm đánh giá
  runtime: string;        // Thời lượng
  rated: string;          // Độ tuổi
  release: string;        // Ngày phát hành
  poster: string;         // Link ảnh poster
  genres: string[];       // Danh sách thể loại
}

export default function OutstandingMovieItemComponent({
  id,
  title,
  year,
  rating,
  runtime,
  rated,
  release,
  poster,
  genres
}: OutstandingMovieItemComponentProps) {
  return (
    <div className="movie-item">
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12">
          <div className="title-in">
            <div className="cate">
              {genres.map((genre, index) => (
                <span key={index} className={getGenreClass(index)}>
                  <a href="#">{genre}</a>
                </span>
              ))}
            </div>
            <h1>
              <a href="#">
                {title} <br />
                <span>{year}</span>
              </a>
            </h1>
            <div className="social-btn">
              <a href="#" className="parent-btn">
                <i className="ion-play"></i> Watch Trailer
              </a>
              <a href="#" className="parent-btn">
                <i className="ion-heart"></i> Add to Favorite
              </a>
              <div className="hover-bnt">
                <a href="#" className="parent-btn">
                  <i className="ion-android-share-alt"></i>share
                </a>
                <div className="hvr-item">
                  <a href="#" className="hvr-grow">
                    <i className="ion-social-facebook"></i>
                  </a>
                  <a href="#" className="hvr-grow">
                    <i className="ion-social-twitter"></i>
                  </a>
                  <a href="#" className="hvr-grow">
                    <i className="ion-social-googleplus"></i>
                  </a>
                  <a href="#" className="hvr-grow">
                    <i className="ion-social-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="mv-details">
              <p>
                <i className="ion-android-star"></i>
                <span>{rating}</span> /10
              </p>
              <ul className="mv-infor">
                <li>Run Time: {runtime}</li>
                <li>Rated: {rated}</li>
                <li>Release: {release}</li>
              </ul>
            </div>
            <div className="btn-transform transform-vertical">
              <div >
                <a href={`/movie-detail/${id}`} className="item item-1 redbtn">
                  more detail
                </a>
              </div>
              <div>
                <a href={`/movie-detail/${id}`} className="item item-2 redbtn hvrbtn">
                  more detail
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 col-xs-12">
          <div className="mv-img-2">
            <a href="#">
              <img src={poster} alt={title} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hàm helper để set class màu cho genre
function getGenreClass(index: number): string {
  const classes = ["blue", "yell", "orange", "green", "red"];
  return classes[index % classes.length];
}
