import React, {useEffect, useState} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import './TafseerViewer.scss'
import {isMobile} from "../../../lib";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
    pdfSrc: string; // Dynamic PDF source
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfSrc }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const {filter} = useSelector(getTafseerState)
    const [, setPageNumberValue] = useState(0)
    const pageNumber = +(filter?.currentPage || 1)
    const [windowDimensions, setWindowDimensions] = useState({
        width: 900,
        height: 500,
    });
    const [scale, setScale] = useState(1)
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        const handleResize = () => {
           if (isMobile()){
               const container = document.querySelector('.container') as any
               setWindowDimensions({
                   width: container.offsetWidth - 30,
                   height: 500,
               });
           }
        };

        handleResize()
    }, []);

    const zoomIn = ()=>{
        setScale(scale + .1)
    }


    return (
        <div>
            <div className='pdf-document'>
                <Document file={pdfSrc} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page  scale={scale} renderTextLayer={false} renderMode='canvas' width={windowDimensions.width} height={windowDimensions.height} pageNumber={pageNumber} />
                </Document>
            </div>
        </div>
    );
};

export default PdfViewer;
