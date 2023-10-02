import React from 'react'

const EmailInput = (props) => {

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
            <input type="email"
                required={req}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                className={`input input-accent input-bordered ${props.width}`}
            />
        </div>
    )
}

export default EmailInput