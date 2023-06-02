import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getAllMovies } from "../../Redux/Slices/HomeSlice";
import { Link } from "react-router-dom";
import "../../Style/moviesSlider.css";

const MoviesSlider = () => {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
  };

  const { movies } = useSelector((state) => state.homeSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <div className="mb-5 container mov-slick">
      <h1 className="text-info mt-5 fw-bold">Movies</h1>

      <div>
        <Slider {...settings} className="mt-5 text-light container">
          {movies.map((movie, index) => (
            <div key={index}>
              <Link to={`/moviedetails/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                  alt="movie.title"
                  width="80%"
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MoviesSlider;
