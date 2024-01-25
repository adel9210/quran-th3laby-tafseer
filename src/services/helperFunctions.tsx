import {SuraList} from "../quranData";

export const getSuraInfo = (suraIndex: string) => {
    const sura = SuraList[+suraIndex];

    return {
        suraName: sura[4],
        ayaCount: sura[1],

    }

}