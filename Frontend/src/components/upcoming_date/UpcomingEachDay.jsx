import React from 'react'
import './upcoming-each-day.css'
import UpcomingList from './UpcomingList'

const UpcomingEachDay = (props) => {
    const dataInDay = props.data
    // {console.log(dataInDay)}
    return (
        <div className='upcoming-each-day'>
            <div className='each-day-date'>
                {props.date}
            </div>
            <div className='each-day-list'>
                {dataInDay.map(day => <UpcomingList key={day.sport_id} link={"/upcoming/"+day.sport_id} name={day.sport_name} sport={day.sport_type} time={day.datetime.toLocaleTimeString()} data={day}/>)}
            </div>
        </div>
    )
}

export default UpcomingEachDay