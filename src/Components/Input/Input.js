import React from 'react'
import './Input.css'

const Input = (props) => {

    const changeValueHandler = (e) => {
        props.setData(e.target.value)
    }

    return (
        <input className={`input ${props.className}`} name={props.name} type={props.type} placeholder={props.placeholder} value={props.data} onChange={changeValueHandler} />
    )
}

export default Input