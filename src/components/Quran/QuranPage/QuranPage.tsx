import './QuranPage.scss';
import PdfViewer from "../TafseerViewer/TafseerViewer";
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";


export const QuranPage = () => {
    const {filter} = useSelector(getTafseerState)

    return <div className='quran-page page' >
        <div className='page-content'>
           <PdfViewer  />
        </div>
    </div>
};
