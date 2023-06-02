import { createSlice } from "@reduxjs/toolkit";

const pagesCounter = createSlice({
  name: "pageCounter",
  initialState: { page: 1 },
  reducers: {
    nextPage: (state) => {
      state.page < 500 && state.page++;
    },
    prevPage: (state) => {
      state.page > 1 && state.page--;
    },
    firstPage: (state) => {
      state.page = 1;
    },
    lastPage: (state) => {
      state.page = 500;
    },
  },
});

export const { nextPage, prevPage, firstPage, lastPage } = pagesCounter.actions;

export const allPagesCounter = pagesCounter.reducer;
