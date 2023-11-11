import React from 'react'
import './upcoming-date.css'
import UpcomingEachDay from './UpcomingEachDay'
import sampleData from '../../data/sampleData'

const UpcomingDate = () => {
    return (
        <div className='upcoming-date'>
            <h1>November</h1>
            {/* {console.log(new DatesampleData[0].datetime["%date"])} */}
            {/* {console.log(sampleData.filter(data => (new Date("2023-11-08T00:00:00Z")<= new Date(data.datetime["%date"]))))} */}
            <UpcomingEachDay date='8 WED' data={sampleData.filter(data=> (new Date("2023-11-08T00:00:00Z")<= new Date(data.datetime) && new Date(data.datetime)<=new Date("2023-11-08T23:59:59Z")))}/>
            <UpcomingEachDay date='9 THU' data={sampleData.filter(data=> (new Date("2023-11-09T00:00:00Z")<= new Date(data.datetime) && new Date(data.datetime)<=new Date("2023-11-09T23:59:59Z")))}/>
        </div>
    )
}

export default UpcomingDate