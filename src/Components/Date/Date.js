import React, { useState } from 'react'
import Input from '../Input/Input'
import './Date.css'

const DateComponent = (props) => {

    const MonthChangeHandler = (e) => {
        props.setMonth(e.target.value)
    }

    return (
        <div className='Date'>
            <Input className="date-Input" data={props.year} setData={props.setYear} />
            <select id="Months" defaultValue={props.month} onChange={MonthChangeHandler}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <Input className="date-Input" data={props.day} setData={props.setDay} />
        </div>
    )
}

export default DateComponent