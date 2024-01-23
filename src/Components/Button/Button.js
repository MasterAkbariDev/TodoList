import React from 'react'
import './Button.css'

const Button = (props) => {
  return (
    <button onClick={props.click} className={`btn ${props.className}`} type={props.type} name={props.name}>{props.children}</button>
  )
}

export default Button