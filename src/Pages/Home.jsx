import React from "react";
import MoviesSlider from "../Components/Homecomponents/MoviesSlider";
import SeriesSlider from "../Components/Homecomponents/SeriesSlider";
import TopMoviesSlider from "../Components/Homecomponents/TopMoviesSlider";
import TopSeriesSlider from "../Components/Homecomponents/TopSeriesSlider";

const Home = () => {
  return (
    <div>
      <MoviesSlider />
      <SeriesSlider />
      <TopMoviesSlider />
      <TopSeriesSlider />
    </div>
  );
};

export default Home;
