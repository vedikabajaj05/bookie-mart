import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
console.log(initialState);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item._id != action.payload._id);
    },
    clearCart(state, action) {
      return state.filter((item) => item.id != action.payload.id);
    },
  },
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
