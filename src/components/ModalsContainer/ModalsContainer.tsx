import {Modal} from "../ui-components/Modal/Modal";
import {SuraModal} from "../ui-components/SuraModal/SuraModal";
import {AyaModal} from "../ui-components/AyaModal/AyaModal";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getActiveModals} from "../../redux/selectors";
import {setActiveModal} from "../../redux/quran.slice";
import {ModalTypes} from "../../types";
import {MobileFilterModal} from "../ui-components/MobileFilterModal/MobileFilterModal";

export const ModalsContainer = () => {
    const dispatch = useDispatch()

    const {
        isSuraModalOpen,
        isAyaModalOpen,
        isMobileFilterModalOpen
    } = useSelector(getActiveModals);

    const resetModal = useCallback((activateModalKey: ModalTypes) => {
        dispatch(setActiveModal({[activateModalKey]: false}))
    }, [])


    return <>
        {isSuraModalOpen && <Modal key={1} title='إختر السورة' onClose={() => resetModal('isSuraModalOpen')}>
            <SuraModal/>
        </Modal>
        }

        {isAyaModalOpen && <Modal key={2} title='إختر الايه' onClose={() => resetModal('isAyaModalOpen')}>
            <AyaModal/>
        </Modal>
        }

        {isMobileFilterModalOpen &&
            <Modal key={5} style={{zIndex: 19}} title='بحث' onClose={() => resetModal('isMobileFilterModalOpen')}>
                <MobileFilterModal/>
            </Modal>
        }
    </>
}
