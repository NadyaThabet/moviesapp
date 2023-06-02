import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_KEY from "../../API_KEY";

// Movies
export const getAllMovies = createAsyncThunk(
  "getmovies",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Series
export const getAllSeries = createAsyncThunk(
  "getseries",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Top Movies
export const getTopMovies = createAsyncThunk(
  "getTopMovies",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Top Series
export const getTopseries = createAsyncThunk(
  "getTopSeries",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const HomeSlice = createSlice({
  name: "moviesslice",
  initialState: {
    movies: [],
    series: [],
    topmovies: [],
    topseries: [],
  },
  extraReducers: (builder) => {
    // Movies
    builder.addCase(getAllMovies.pending, (state) => {});
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.movies = action.payload.results;
    });
    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // Series
    builder.addCase(getAllSeries.pending, (state) => {});
    builder.addCase(getAllSeries.fulfilled, (state, action) => {
      state.series = action.payload.results;
    });
    builder.addCase(getAllSeries.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // Top Movies
    builder.addCase(getTopMovies.pending, (state) => {});
    builder.addCase(getTopMovies.fulfilled, (state, action) => {
      state.topmovies = action.payload.results.filter((e) => {
        return e.vote_average > 7;
      });
    });
    builder.addCase(getTopMovies.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // Top Series
    builder.addCase(getTopseries.pending, (state) => {});
    builder.addCase(getTopseries.fulfilled, (state, action) => {
      state.topseries = action.payload.results.filter((e) => {
        return e.vote_average >= 6;
      });
    });
    builder.addCase(getTopseries.rejected, (state, action) => {
      state.error = action.payload.message;
    });
  },
});

export const homeSlices = HomeSlice.reducer;
