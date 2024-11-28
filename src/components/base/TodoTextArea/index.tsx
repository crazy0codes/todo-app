type TodoTextAreaTypes = {
    style : string,
    placeholder:string,
}

export function TodoTextArea({style, placeholder}: TodoTextAreaTypes){
    return <textarea 
    placeholder={placeholder} 
    className={style}></textarea>
}