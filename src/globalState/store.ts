'use client'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import variantReducer from "./variantReducer";
import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
    reducer: {
        variants: variantReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch:()=> typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;