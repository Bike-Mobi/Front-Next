import React from 'react'
import ReactInputMask from 'react-input-mask'

const TextInput = (props) => {

    // width deve ser w-32, w-40, w-80 ...

    let req, classReq
    if(props.required) {
        req = true
        classReq = "after:content-['*'] after:ml-0.5 after:text-error"
    } else {
        req = false
    }

    console.log('dafault value: ',props.defaultValue)
    return (
        <div className={`${props.ClassName} ${props.width}`}>
            <label className="label">
                <span className={`label-text font-medium ${classReq}`}>{props.name}</span>
            </label>
            <div className='flex'>
                {props.price ? (
                    <div className='flex m-1 text-accent text-xl font-bold text-center p-2'>
                        R$
                    </div>
                ) : null}
                <ReactInputMask type="text"
                    required={req}
                    placeholder={props.placeholder}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}
                    mask={props.mask}
                    className={`input input-accent input-bordered ${props.width}`}
                    disabled={props.disabled}
                    onClick={props.onClick}
                />
            </div>
        </div>
    )
}

export default TextInput