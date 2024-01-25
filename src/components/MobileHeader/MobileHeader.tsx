import './MobileHeader.scss';
import {useDispatch} from "react-redux";
import {setActiveModal} from "../../redux/quran.slice";

export const MobileHeader = () => {
    const dispatch = useDispatch()


    return <div className='header-mobile'>
        <img className='header-mobile__logo' src={require('../../assets/images/logo-short.png')} alt='Logo'/>
        <a className='header-mobile__menu' onClick={()=>{
            dispatch(setActiveModal({isMobileFilterModalOpen: true}))
        }}>
            <img src={require('../../assets/images/menu-burger.png')}
                 alt='Menu'/>
        </a>
    </div>
}