import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_KEY from "../../API_KEY";

export const getSeries = createAsyncThunk("getseries", async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${id}`
    );
    const details = await data.json();
    return details;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const seriesSlice = createSlice({
  name: "serieslice",
  initialState: {
    series: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getSeries.pending, (state) => {});
    builder.addCase(getSeries.fulfilled, (state, action) => {
      state.series = action.payload.results;
    });
    builder.addCase(getSeries.rejected, (state, action) => {
      state.error = action.payload.message;
    });
  },
});

export const serieslice = seriesSlice.reducer;
