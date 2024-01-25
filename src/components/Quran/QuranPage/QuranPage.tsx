import './QuranPage.scss';
import PdfViewer from "../TafseerViewer/TafseerViewer";

export const QuranPage = () => {
    const dynamicPdfSrc = 'books/1.pdf';

    return <div className='quran-page page' >
        <div className='page-content'>
           <PdfViewer pdfSrc={dynamicPdfSrc} />
        </div>
    </div>
};
