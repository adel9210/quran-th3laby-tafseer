import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {filterTypes, Sura, Tafseer} from "../types";
import {
    getGoz2Details,
    getPageDetails,
    getPageDetailsBySuraAndAyaNumber,
    getQuarterDetail,
    getSuraList,
    getSuraQuarter
} from "../services/client.service";

export interface QuranSliceType {
    // highlighterHoverId: string
    // highlighterActiveId: string,
    activeSuraInfo: Sura,
    activeTafseerPage:Tafseer[];
    modal?: {
        isSuraModalOpen?: boolean
        isAyaModalOpen?: boolean
        // isPageModalOpen?: boolean,
        // isGoz2ModalOpen?: boolean,
        // isTafseerModalOpen?: boolean,
        isMobileFilterModalOpen?: boolean,
    },
    filter?: {
        currentPage?: string,
        currentSura?: string,
        currentAya?: string,
        // currentGoz2?: string,
        // currentQuarter?: string,
        // currentSheikh?: string,
        tafseerLang?: 'ar' | 'en'
    }
}

const initialState: Partial<QuranSliceType> = {
    filter: {
        currentAya: '1',
        currentSura: '1',
        currentPage: '1',
        // currentGoz2: '1',
        // currentQuarter: '1',
        // currentSheikh: 'Husary_64kbps',
        tafseerLang: 'ar'
    }
}

const getSuraByPageNumber = (pageNumber: number) => {
    return getSuraList().filter(sura => sura.pageEnd >= pageNumber)[0]
}

const getAyaByPageNumber = (pageNumber: number) => {
    return getPageDetails(pageNumber)[0]
}

const getPageBySuraAndAyaNumber = (suraNumber: number, ayaNumber: number) => {
    return getPageDetailsBySuraAndAyaNumber(suraNumber, ayaNumber)[0]
}


export const quranSlice = createSlice({
    name: 'quran',
    initialState,
    reducers: {
        setActiveModal: (state, action: PayloadAction<Record<string, boolean>>) => {
            state.modal = {...state.modal, ...action.payload}
        },
        setSuraInfo: (state, action: PayloadAction<Sura>) => {
            state.activeSuraInfo = action.payload
        },
        setFilter: (state, action: PayloadAction<{ key: filterTypes, value: string }>) => {
            let filter = {...state.filter, [action.payload.key]: action.payload.value}
            switch (action.payload.key) {
                case 'currentSura':
                    filter = {
                        ...filter,
                        currentAya: '1',
                    }
                    break
                case 'currentPage':
                    filter = {
                        ...filter,
                        currentSura: getSuraByPageNumber(Number(filter.currentPage))?.index?.toString(),
                        currentAya: getAyaByPageNumber(Number(filter.currentPage)).startAyaNumber.toString()
                    }
                    break
                case 'currentAya':
                    filter = {
                        ...filter,
                        currentPage: getPageBySuraAndAyaNumber(Number(filter.currentSura), Number(filter.currentAya))?.pageNumber.toString(),
                    }
                    break

            }
            state.filter = {...filter}
        },
        setBulkFilters: (state, action: PayloadAction<any>) =>{
                state.filter = action.payload
        },
        setPageTafseer: (state, action: PayloadAction<Tafseer[]>) =>{
            state.activeTafseerPage = action.payload
        }
    },
})

export const {
    setActiveModal,
    setFilter,
    setBulkFilters,
    setSuraInfo,
} = quranSlice.actions

export default quranSlice.reducer
