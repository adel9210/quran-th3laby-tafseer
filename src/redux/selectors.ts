import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "./store";

export const getActiveModals = createSelector((state: RootState) => state, (data) => data.quran.modal || {})
export const getTafseerState = createSelector((state: RootState) => state, (data) => data.quran)
