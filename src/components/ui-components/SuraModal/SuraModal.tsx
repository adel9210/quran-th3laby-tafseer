import {Button} from "../Button/Button";
import './SuraModal.scss'
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import {useEffect, useState} from "react";
import {getSuraList} from "../../../services/client.service";
import {filterTypes, Sura} from "../../../types";
import {setActiveModal, setFilter, setSuraInfo} from "../../../redux/quran.slice";


export const SuraModal = () => {
    const {filter} = useSelector(getTafseerState)
    const [suraList, setSuraList] = useState<Sura[]>()
    const dispatch = useDispatch()

    useEffect(() => {
        const response = getSuraList()
        setSuraList(response)
    }, [])

    const onSelect = (data: { key: filterTypes, value: string }, sura: Sura) => {
        dispatch(setSuraInfo(sura))
        dispatch(setFilter(data))
        dispatch(setActiveModal({['isSuraModalOpen']: false}))
    }

    return <div className='Sura-list'>
        {
            suraList?.map((sura) => {
                return <div key={sura.index}>
                    <Button className={sura.index === (filter && Number(filter?.currentSura)) ? 'active' : ''}
                            key={sura.index}
                            style={{width: '100%'}}
                            onClick={() => onSelect({key: 'currentSura', value: sura.index.toString()}, sura)}>
                        <span style={{display: "block"}}>{sura.index}</span>
                        <span>{sura.arabicName}</span>
                    </Button>
                </div>
            })
        }
    </div>
}
