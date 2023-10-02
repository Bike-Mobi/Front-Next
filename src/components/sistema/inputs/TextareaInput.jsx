import React from 'react'

const TextareaInput = (props) => {

    // width deve ser w-32, w-40, w-80 ...

    let req, classReq
    if(props.required) {
        req = true
        classReq = "after:content-['*'] after:ml-0.5 after:text-error"
    } else {
        req = false
    }

    return (
        <div className={`${props.ClassName} ${props.width}`}>
            <label className="label">
                <span className={`label-text font-medium ${classReq}`}>{props.name}</span>
            </label>
            <textarea
                required={req}
                placeholder={props.placeholder}
                // value={props.value}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                className={`textarea textarea-bordered textarea-accent ${props.width}`}
                disabled={props.disabled}
                onClick={props.onClick}
            ></textarea>
        </div>
    )
}

export default TextareaInput