import './Button.scss';
import {ButtonHTMLAttributes} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: JSX.Element | JSX.Element[] | string
}

export const Button = (props: Props) => {
    const {onClick, children} = props
    return <button {...props} className={`button ${props.className}`} onClick={onClick} >
        {children}
    </button>
}