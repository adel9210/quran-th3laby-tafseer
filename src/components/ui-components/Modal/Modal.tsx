import './Modal.scss';
import React from "react";

interface Props {
    children: JSX.Element,
    onClose?: () => void,
    title: string
    style?: any
}

export const Modal = (props: Props) => {
    const {children, onClose, title, style} = props

    const onOutSideClose = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }

    return <div className='co-modal' style={{...style}}>
        <div className='co-modal-container' onClick={(e) => onOutSideClose(e)}>
            <div className='co-modal__header'>
                <h2 className='co-modal__header__heading'> {title}</h2>
                <a onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                              stroke="#151818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.17004 14.8299L14.83 9.16992" stroke="#151818" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.83 14.8299L9.17004 9.16992" stroke="#151818" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>

            <div className='co-modal__body'>
                {children}
            </div>
        </div>
    </div>
}
