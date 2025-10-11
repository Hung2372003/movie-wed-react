
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PreloaderComponent from "../../components/preloader/preloader.component";
import { useEffect, useState } from "react";
import MovieGridComponent from "../../layouts/movie-grid/movie-grid.component";
import SearchFormComponent, { type SearchFormValues } from "../../components/search-form/search-form.component";
import { MoviesApi, RatingsApi } from "../../api/end-point.api";
import type { Movie } from "../../types/api-response.interface";

export default function MoviesPage() {
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState({total: 0, page: 1, pageSize: 10, data: [] as Movie[]});
  const total = movies.data.length;
  const pagedMovies = movies.data
    .slice((page - 1) * perPage, page * perPage)
    .map((movie) => ({
      ...movie,
      image: movie.posterUrl ?? "images/uploads/default.jpg", // provide a default image if missing
      rating: movie.averageRating ?? 0, // use the averageRating property if available
    }));
  // const totalPages = Math.ceil(total / perPage);

  useEffect(() => {
  const fetchMovie = async () => {
    try {
      let res = await MoviesApi.getAll(page, perPage);
      let movies = res.data.data;

      // Map qua tất cả movies để lấy rating song song
      const moviesWithRatings = await Promise.all(
        movies.map(async (movie) => {
          try {
            let ratingRes = await RatingsApi.getAverageRating(movie.id);
            return { ...movie, averageRating: ratingRes.data.average };
          } catch (err) {
            console.error("Lỗi khi load rating:", err);
            return { ...movie, averageRating: null }; // fallback
          }
        })
      );

      setMovies({
        total: res.data.total,
        page: res.data.page,
        pageSize: res.data.pageSize,
        data: moviesWithRatings,
      });
    } catch (err) {
      console.error("Lỗi khi load movie:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchMovie();
}, [page, perPage]);
  const handleSearch = (data: SearchFormValues) => {
      console.log("Dữ liệu nhận được từ SearchForm:", data);

    };
  if (loading) return <PreloaderComponent />;

  return (
    <>
       <div className="hero common-hero">
            `<div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="hero-ct">
                            <h1> movie listing</h1>
                            <ul className="breadcumb">
                                <li className="active"><a href="#">Home</a></li>
                                <li> <span className="ion-ios-arrow-right"></span> movie listing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="page-single">
          <div className="container">
            <div className="row ipad-width">
                <div className="col-md-8 col-sm-12 col-xs-12">
                    <MovieGridComponent
                        movies={pagedMovies}
                        total={total}
                        moviesPerPage={perPage}
                        onPageChange={(newPage) => setPage(newPage)}
                        onPerPageChange={(newPerPage) => {
                          setPerPage(newPerPage);
                          setPage(1); // reset về page 1 khi đổi perPage
                        }}
                        onSortChange={(sort) => console.log("Sort:", sort)}
                      />
                </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
			        	<div className="sidebar">
                  <SearchFormComponent onSubmit={handleSearch}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
