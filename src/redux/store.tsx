import {configureStore} from '@reduxjs/toolkit'
import quranSlice from "./quran.slice";

export const store = configureStore({
    reducer: {
        quran: quranSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
