import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_KEY from "../../API_KEY";

export const getMovies = createAsyncThunk("getmovies", async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${id}`
    );
    const details = await data.json();
    return details;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const moviesSlice = createSlice({
  name: "movieSlice",
  initialState: {
    movies: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {});
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload.results;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.error = action.payload.message;
    });
  },
});

export const movieslice = moviesSlice.reducer;
