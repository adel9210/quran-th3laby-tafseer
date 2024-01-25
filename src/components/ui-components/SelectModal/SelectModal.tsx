import './SelectModal.scss';


interface Props {
    placeholder: string,
    value?: string,
    onClick?: () => void
}

export const SelectModal = (props: Props) => {
    const {placeholder, value, onClick} = props
    return <div className='select' onClick={onClick}>
        <h2 className='select__value'>
            {value || <span className='select__value__placeholder'>{placeholder}</span>}
        </h2>
    </div>
}