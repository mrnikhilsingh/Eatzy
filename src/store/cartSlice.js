import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem(state, action) {
      const modifiedData = {
        ...action.payload,
        card: {
          ...action.payload.card,
          info: {
            ...action.payload.card?.info,
            quantity: 1,
          },
        },
      };

      state.push(modifiedData);
    },
    removeItem(state, action) {
      return state.filter((item) => item.card.info.id !== action.payload);
    },
    clearCart(state) {
      state.length = 0;
    },
    incrementQuantity(state, action) {
      const item = state.find((item) => item.card.info.id === action.payload);
      if (item) item.card.info.quantity += 1;
    },
    decrementQuantity(state, action) {
      const item = state.find((item) => item.card.info.id === action.payload);
      if (item && item.card.info.quantity > 1) item.card.info.quantity -= 1;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
