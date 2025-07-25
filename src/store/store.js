import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";
import cityReducer from "./citySlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    location: locationReducer,
    city: cityReducer,
  },
});

export default store;
