import React from 'react'
import './upcoming-date.css'
import UpcomingEachDay from './UpcomingEachDay'
import sampleData from '../../data/sampleData'

const UpcomingDate = () => {
    return (
        <div className='upcoming-date'>
            <h1>July</h1>
            <UpcomingEachDay date='29 WED' data={sampleData.filter(data => (
                new Date("2024-07-29T00:00:00.000Z") <= new Date(data.datetime) && 
                new Date(data.datetime) <= new Date("2024-07-29T23:59:59.999Z")
            ))}/>
            <UpcomingEachDay date='30 THU' data={sampleData.filter(data => (
                new Date("2024-07-30T00:00:00.000Z") <= new Date(data.datetime) &&
                new Date(data.datetime) <= new Date("2024-07-30T23:59:59.999Z")
            ))}/>
        </div>
    )
}

export default UpcomingDate