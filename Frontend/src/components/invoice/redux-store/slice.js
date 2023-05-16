import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "ProductsArray",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.splice(action.payload, 1);
    },
    clearAll: (state) => {
      return [];
    }
  }
});

export const { addProduct, deleteProduct, clearAll } = Slice.actions;
