"use client";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import apartmentsReducer from "./slices/apartmentsSlice";

export const store = configureStore({
  reducer: { apartments: apartmentsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
