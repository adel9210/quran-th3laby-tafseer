import {Button} from "../Button/Button";
import './AyaModal.scss'
import {useDispatch, useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import {setActiveModal, setFilter} from "../../../redux/quran.slice";
import {useEffect, useState} from "react";
import {Sura} from "../../../types";
import {getSuraDetails} from "../../../services/client.service";


export const AyaModal = () => {
    const {filter} = useSelector(getTafseerState)
    const dispatch = useDispatch()
    const [sura, setSura] = useState<Sura>()


    useEffect(() => {
        (async () => {
            const response = getSuraDetails(Number(filter?.currentSura))
            setSura(response)
        })()
    }, [])


    const onSelect = (data: any) => {
        dispatch(setFilter(data))
        dispatch(setActiveModal({['isAyaModalOpen']: false}))
    }


    return <div className='list'>
        {!filter?.currentSura && <p>قم بإختيار السورة اولا</p>}

        {
            Array(sura?.ayaCount).fill('1').map((sura, index) => {
                const AyaNumber = index + 1
                return <Button key={AyaNumber}
                               className={AyaNumber === (filter && Number(filter?.currentAya)) ? 'active' : ''}
                               onClick={() => onSelect({key: 'currentAya', value: AyaNumber.toString()})}>
                    <span>{AyaNumber}</span>
                </Button>

            })
        }
    </div>
}
