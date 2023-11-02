import React from 'react'
import './upcoming-date.css'
import UpcomingEachDay from './UpcomingEachDay'

const UpcomingDate = () => {
    return (
        <div className='upcoming-date'>
            <h1>October</h1>
            <UpcomingEachDay date='1 WED'/>
            <UpcomingEachDay date='2 THU'/>
        </div>
    )
}

export default UpcomingDate