import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {useSelector} from "react-redux";
import {getTafseerState} from "../../../redux/selectors";
import './TafseerViewer.scss'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
    pdfSrc: string; // Dynamic PDF source
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfSrc }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const {filter} = useSelector(getTafseerState)
    const [, setPageNumberValue] = useState(0)
    const pageNumber = +(filter?.currentPage || 1)

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };


    return (
        <div>
            <div className='pdf-document'>
                <Document file={pdfSrc} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page scale={.8} renderTextLayer={false} renderMode='canvas' width={900} height={500} pageNumber={pageNumber} />
                </Document>
                <p style={{textAlign: 'center'}}>{pageNumber}</p>
            </div>
        </div>
    );
};

export default PdfViewer;
