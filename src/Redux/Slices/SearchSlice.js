import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_KEY from "../../API_KEY";

export const getSearchResults = createAsyncThunk(
  "getsearchresults",
  async (query, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query}&api_key=${API_KEY}`
      );
      const details = await data.json();
      return details;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const searchSlice = createSlice({
  name: "searchresult",
  initialState: {
    searchResult: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResults.pending, (state) => {});
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      state.searchResult = action.payload;
    });
    builder.addCase(getSearchResults.rejected, (state, action) => {
      state.error = action.payload.message;
    });
  },
});

export const searchBarSlice = searchSlice.reducer;
