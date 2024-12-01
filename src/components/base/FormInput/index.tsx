type Input = {
    type: string,
    placeholder: string,
    onChange?: () => void,
    className?: string,
    name: string
}


export function FormInput({type, onChange, placeholder, className, name}: Input){
    return(
        <input 
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        />
    )
}