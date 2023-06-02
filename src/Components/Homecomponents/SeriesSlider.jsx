import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getAllSeries } from "../../Redux/Slices/HomeSlice";
import { Link } from "react-router-dom";
import "../../Style/seriesSlider.css";

const SeriesSlider = () => {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
  };

  const { series } = useSelector((state) => state.homeSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSeries());
  }, [dispatch]);

  return (
    <div className="mt-5 mb-5 container ser-slick">
      <h1 className="text-info mt-5 fw-bold">Series</h1>

      <div className="">
        <Slider {...settings} className="mt-5 text-light container">
          {series.map((show, index) => (
            <div key={index}>
              <Link to={`/seriesdetails/${show.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${show.poster_path}`}
                  alt="show.name"
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

export default SeriesSlider;
