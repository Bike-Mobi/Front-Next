import React from 'react'
import ReactInputMask from 'react-input-mask'

const NumberInput = (props) => {

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
            <ReactInputMask type="number"
                required={req}
                placeholder={props.placeholder}
                value={props.value}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                mask={props.mask}
                className={`input input-accent input-bordered ${props.width}`}
                disabled={props.disabled}
            />
        </div>
    )
}

export default NumberInput