import React from 'react'

export const CheckBoxInput = (props) => {
  return (
    <div className={`${props.className}`}>
        {props.items.map((item, index) => (
                <label key={index} className="cursor-pointer label whitespace-nowrap inline-flex mr-1" id={index}>
                    <input className="checkbox checkbox-primary mr-2"
                        onChange={item.toogle}
                        type="checkbox"
                        checked={item.value}
                    />
                    <span className="label-text">{item.name}</span>
                </label>
        ))}
    </div>

  )
}
