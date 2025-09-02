
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PreloaderComponent from "../components/preloader/preloader.component";
import { useEffect, useState } from "react";



export default function MoviesPage() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    }, []);
    if (loading) {
      return <PreloaderComponent />;
    }

  return (
    <>
       <div className="hero common-hero">
            `<div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="hero-ct">
                            <h1> movie listing - grid</h1>
                            <ul className="breadcumb">
                                <li className="active"><a href="#">Home</a></li>
                                <li> <span className="ion-ios-arrow-right"></span> movie listing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    </>
  );
}
