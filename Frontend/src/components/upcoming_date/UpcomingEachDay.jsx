import React from 'react'
import './upcoming-each-day.css'
import UpcomingList from './UpcomingList'

const UpcomingEachDay = (props) => {
    return (
        <div className='upcoming-each-day'>
            <div className='each-day-date'>
                {props.date}
            </div>
            <div className='each-day-list'>
                <UpcomingList name='England VS Thailand' sport='Basketball' time='1.00PM-3.00PM'/>
            </div>
        </div>
    )
}

export default UpcomingEachDay