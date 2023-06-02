import { configureStore } from "@reduxjs/toolkit";
import { homeSlices } from "./Slices/HomeSlice";
import { movieslice } from "./Slices/MoviesSlice";
import { serieslice } from "./Slices/SeriesSlice";
import { allPagesCounter } from "./Slices/PagesCounter";
import { detailSlice } from "./Slices/DetailsSlice";
import { searchBarSlice } from "./Slices/SearchSlice";

export const store = configureStore({
  reducer: {
    homeSlice: homeSlices,
    allMoviesSlice: movieslice,
    allSeriesSlice: serieslice,
    pages: allPagesCounter,
    details: detailSlice,
    search: searchBarSlice,
  },
});
