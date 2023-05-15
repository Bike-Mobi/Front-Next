import React from 'react'

const RadioInput = (props) => {
    return (
        <div>
            <label className="label">
                <span className="label-text font-medium">{props.name}</span>
            </label>
            <div className='grid grid-cols-2 gap-4 ml-1 mt-2'>
                {props.items.map((item, index) => (
                    
                    <div className="flex items-center gap-x-2" key={index}>
                        <input
                            id={index}
                            name={props.name}
                            value={item.name}
                            type="radio"
                            onChange={props.onChange}
                            className="radio radio-primary border-cinza"
                            checked={props.value == item.name ? true : null}
                        />
                        <label htmlFor="push-everything" className="block text-sm leading-6">
                        {item.name}
                        </label>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default RadioInput