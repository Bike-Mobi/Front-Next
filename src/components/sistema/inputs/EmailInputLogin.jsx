const EmailInputLogin = (props) => {

    let req
    if(props.required) {
        req = true
    } else {
        req = false
    }

    return (
        <div className={`${props.ClassName} ${props.width}`}>
            <label className="label">
                <span className={`label-text text-lg text-cinza`}>{props.name}</span>
            </label>
            <input type="email"
                required={req}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                className={`input input-bordered border-cinza bg-transparent ${props.width}`}
            />
        </div>
    )
}

export default EmailInputLogin