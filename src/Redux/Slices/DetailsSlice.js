import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_KEY from "../../API_KEY";

// movie details
export const getMoviesDetails = createAsyncThunk(
  "getmoviedetails",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// movie credits
export const getMoviesCredits = createAsyncThunk(
  "getmoviecredits",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// movie trailer
export const getMovieTrailer = createAsyncThunk(
  "getmovietrailer",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// series details
export const getSeriesDetails = createAsyncThunk(
  "getseriesdetails",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// series credits
export const getSeriesCredits = createAsyncThunk(
  "getseriescredits",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// series trailer
export const getSeriesTrailer = createAsyncThunk(
  "getseriestrailer",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const detailsSlice = createSlice({
  name: "detailSlice",
  initialState: {
    moviesDetails: {},
    moviesCredits: {},
    moviesTrailer: {},
    seriesDetails: {},
    seriesCredits: {},
    seriesTrailer: {},
  },
  extraReducers: (builder) => {
    // movie details
    builder.addCase(getMoviesDetails.pending, (state) => {});
    builder.addCase(getMoviesDetails.fulfilled, (state, action) => {
      state.moviesDetails = action.payload;
    });
    builder.addCase(getMoviesDetails.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // movie credits
    builder.addCase(getMoviesCredits.pending, (state) => {});
    builder.addCase(getMoviesCredits.fulfilled, (state, action) => {
      state.moviesCredits = action.payload;
    });
    builder.addCase(getMoviesCredits.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // movie trailer
    builder.addCase(getMovieTrailer.pending, (state) => {});
    builder.addCase(getMovieTrailer.fulfilled, (state, action) => {
      state.moviesTrailer = action.payload.results.find(
        (movie) => movie.type === "Trailer"
      );
    });
    builder.addCase(getMovieTrailer.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // series details
    builder.addCase(getSeriesDetails.pending, (state) => {});
    builder.addCase(getSeriesDetails.fulfilled, (state, action) => {
      state.seriesDetails = action.payload;
    });
    builder.addCase(getSeriesDetails.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // series credits
    builder.addCase(getSeriesCredits.pending, (state) => {});
    builder.addCase(getSeriesCredits.fulfilled, (state, action) => {
      state.seriesCredits = action.payload;
    });
    builder.addCase(getSeriesCredits.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    // series trailer
    builder.addCase(getSeriesTrailer.pending, (state) => {});
    builder.addCase(getSeriesTrailer.fulfilled, (state, action) => {
      state.seriesTrailer = action.payload.results.find(
        (series) => series.type === "Trailer"
      );
    });
    builder.addCase(getSeriesTrailer.rejected, (state, action) => {
      state.error = action.payload.message;
    });
  },
});

export const detailSlice = detailsSlice.reducer;
