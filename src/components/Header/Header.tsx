import './Header.scss'
import Select from "react-select";
import {SelectModal} from "../ui-components/SelectModal/SelectModal";
import {useDispatch, useSelector} from "react-redux";
import { setActiveModal, setFilter} from "../../redux/quran.slice";
import {getTafseerState} from "../../redux/selectors";
import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {getSuraDetails} from "../../services/client.service";
import {ModalTypes, Sura} from "../../types";


const tafseerLanguage = [
    {value: 'ar', label: 'عربي التفسير الميسر'},
    {value: 'en', label: 'English - Sahih International'},
]

const style = {
    control: (base: any) => ({
        ...base,
        // This line disable the blue border
        boxShadow: 'none',
        '&:hover, &:active': {
            borderColor: '#00A79D',
            outlineColor: '#00A79D',
        }
    })
};

interface Props {
    showLogo?: boolean
    showPlayer?: boolean
}

export const Header = (props: Props) => {
    const dispatch = useDispatch()
    const {filter} = useSelector(getTafseerState)
    const [selectedSura, setSelectedSura] = useState<Sura>()
    const {showLogo , showPlayer } = props

    const onModalSelectClick = (type: ModalTypes) => {
        dispatch(setActiveModal({[type]: true}))
    }


    useEffect(() => {
        if (filter?.currentSura) {
            const response = getSuraDetails(Number(filter.currentSura))
            setSelectedSura(response)
        }

    }, [filter])

    return <div className='header'>
        <Container>
            <Row>
                {showLogo && <Col md={2} className='co-left-border'>
                    <img src={require('../../assets/images/logo.png')} alt='Logo' height={100}/>
                </Col>}
                <Col xs={12} md={10}>
                    <div className='header__pair'>
                        <div className='header__pair__item'>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>السورة</label>
                                <SelectModal value={selectedSura?.arabicName} placeholder='إختر'
                                             onClick={() => onModalSelectClick('isSuraModalOpen')}/>
                            </div>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>الأية</label>
                                <SelectModal placeholder='إختر' value={filter?.currentAya}
                                             onClick={() => onModalSelectClick('isAyaModalOpen')}/>
                            </div>
                            <div className='header__pair__item__control'>
                                <label className='header__pair__item__control__label'>لغة التفسير</label>
                                <Select styles={style}
                                        options={tafseerLanguage}
                                        onChange={(item) => {
                                            dispatch(setFilter({
                                                key: 'tafseerLang',
                                                value: item?.value || ''
                                            }))
                                        }}
                                        placeholder='إختر'/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
}


