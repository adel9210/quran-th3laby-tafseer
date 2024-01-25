import axios from "axios";
import List from '../mock/quran-sura.json'
import Quarters from '../mock/quran-hazb-quarter.json'
import Pages from '../mock/quran-pages.json'
import Goz2Items from '../mock/quran-goz2.json'
import {Aya, AyaTafseer} from "../quranData";

export const axiosInstance = axios.create({
    baseURL: 'https://al-th3labe.omgsys.com/json/',
    timeout: 0,
    headers: {'X-Custom-Header': 'foobar'}
});

export const getSuraList = (): typeof List => {
    return List
}

export const getSuraDetails = (suraIndex: number) => {
    const response = getSuraList()
    return response.filter(sura => sura.index === suraIndex)[0]
}

export const getSuraQuarter = (suraNumber: number): string => {
    const item = Quarters.filter(quarter => quarter.suraNumber === suraNumber)
    const firstQuarter = item[0]
    return (Math.round(firstQuarter?.quarterIndex / 8) + 1).toString()
}

export const getPageDetails = (pageNumber: number): typeof Pages => {
    return Pages.filter(page => page.pageNumber === pageNumber)
}

export const getPageDetailsBySuraAndAyaNumber = (suraNumber: number, ayaNumber: number): Partial<typeof Pages> => {
    const selectedItem: typeof Pages = [];
    for (let i = 0; i < Pages.length; i++) {
        const page = Pages[i];
        const nextIndex = (i + 1) > 114 ? 114 : (i + 1)
        const nextPage = Pages[nextIndex]
        if (page.suraNumber === suraNumber && ayaNumber >= page.startAyaNumber) {
            if (suraNumber !== nextPage.suraNumber || ayaNumber < nextPage.startAyaNumber) {
                selectedItem.push(page)
                break
            }
        }
    }

    return selectedItem
}

export const getQuarterDetail = (quarterIndex: number): typeof Quarters => {
    return Quarters.filter(quarter => quarter.quarterIndex === quarterIndex)
}

export const getGoz2Details = (goz2Number: number): typeof Goz2Items => {
    return Goz2Items.filter(page => page.goz2Number === goz2Number)
}


export const getPageTafseer = async (language:string, pageNumber: number) => {
    const response = await axiosInstance.get<AyaTafseer[]>(`TafseerPages/${language}/${pageNumber}.json`)
    return response.data
}

export const getPageHighlighters = async (pageNumber: number) => {
    const response = await axiosInstance.get<Aya[]>(`highlighterPages/${pageNumber}.json`)
    return response.data
}
