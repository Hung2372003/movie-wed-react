
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PreloaderComponent from "../components/preloader/preloader.component";
import { useEffect, useState } from "react";
import MovieGridComponent from "../layouts/movie-grid/movie-grid.component";
import SearchFormComponent from "../components/search-form/search-form.component";

const movies = [
      { id: 1, title: "Interstellar", image: "images/uploads/mv-item1.jpg", rating: 8.6 },
      { id: 2, title: "Inception", image: "images/uploads/mv-item2.jpg", rating: 8.8 },
      { id: 3, title: "The Dark Knight", image: "images/uploads/mv-item3.jpg", rating: 9.0 },
      { id: 4, title: "Tenet", image: "images/uploads/mv-item4.jpg", rating: 7.5 },
      { id: 5, title: "Dunkirk", image: "images/uploads/mv-item5.jpg", rating: 7.9 },
      { id: 6, title: "Avatar", image: "images/uploads/mv-item6.jpg", rating: 7.8 },
      { id: 7, title: "Avengers: Endgame", image: "images/uploads/mv-item7.jpg", rating: 8.4 },
      { id: 8, title: "Guardians of the Galaxy", image: "images/uploads/mv-item8.jpg", rating: 8.0 },
      { id: 9, title: "The Matrix", image: "images/uploads/mv-item9.jpg", rating: 8.7 },
      { id: 10, title: "The Shawshank Redemption", image: "images/uploads/mv-item10.jpg", rating: 9.3 },
      { id: 11, title: "Avengers: Endgame", image: "images/uploads/mv-item7.jpg", rating: 8.4 },
      { id: 12, title: "Guardians of the Galaxy", image: "images/uploads/mv-item8.jpg", rating: 8.0 },
      { id: 13, title: "The Matrix", image: "images/uploads/mv-item9.jpg", rating: 8.7 },
      { id: 14, title: "The Shawshank Redemption", image: "images/uploads/mv-item10.jpg", rating: 9.3 },
    ];

export default function MoviesPage() {
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const total = movies.length;
  const pagedMovies = movies.slice((page - 1) * perPage, page * perPage);
  // const totalPages = Math.ceil(total / perPage);

  useEffect(() => { setLoading(false)}, []);
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
                  <SearchFormComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
