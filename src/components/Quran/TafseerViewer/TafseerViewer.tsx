import React, {useEffect, useState} from 'react';
// import {Document, Page, pdfjs} from 'react-pdf';
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import './TafseerViewer.scss'
import {isMobile} from "../../../lib";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer: React.FC = () => {
    const {filter} = useSelector(getTafseerState)
    const pageNumber = +(filter?.bookPageNumber || 1)
    const [pdfSource, setPdfSource] = useState('')


    const onDocumentLoadSuccess = ({numPages}: { numPages: number }) => {

    };


    useEffect(() => {
        if (filter && filter.bookNumber) {
              setPdfSource(`https://al-thalabi.com/books/${filter?.tafseerLang}/${filter?.bookNumber}.pdf`)
        }
    }, [filter?.bookNumber, filter?.bookPageNumber]);


    useEffect(() => {
        $('.flipbook-currentPageInput').val(pageNumber)
        $('.flipbook-currentPageHolder form').submit()
    }, [pageNumber]);


    useEffect(()=>{
       if (pdfSource){
           // @ts-ignore
           $(document).ready(function () {
               // @ts-ignore
               $('#flipContainer')?.flipBook({
                   pdfUrl: pdfSource,
                   backgroundColor: '#ddd',
                   rightToLeft:true,
                   btnSound: { hAlign: 'left' },
                   singlePageMode: window.innerWidth > 700 ? false : true,
                   assets: {
                       flipMp3: "flipbook/assets/mp3/turnPage2.mp3",
                   },
                   btnSearch: {
                       enabled: true,
                       title: 'Search',
                       icon: 'fas fa-search',
                   },
               });
           });
       }
    }, [pdfSource])


    return (
        <div id='flipContainer' style={{height: '80vh'}}>
            {/*<div className='pdf-document'>*/}
            {/*    <Document file={pdfSource} onLoadSuccess={onDocumentLoadSuccess}>*/}
            {/*        <Page scale={scale} renderTextLayer={false} renderMode='canvas' width={windowDimensions.width}*/}
            {/*              height={windowDimensions.height} pageNumber={pageNumber}/>*/}
            {/*    </Document>*/}
            {/*</div>*/}
        </div>
    );
};

export default PdfViewer;
