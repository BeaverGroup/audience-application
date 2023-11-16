import React from 'react'
import './upcoming-date.css'
import UpcomingEachDay from './UpcomingEachDay'
import sampleData from '../../data/sampleData'

const UpcomingDate = () => {
    const today = new Date();
    const thisMonth = today.getMonth()+1;
    const thisYear = today.getFullYear();
    const thisDate = today.getDate();
    // const dateAndTime = new Date(data,datetime)
    const dateData = {}
    for (let index = 1; index < 4; index++) {
        // const startDateFormat = new Date(`${thisYear}-${thisMonth}-${index}T00:00:00.000Z`)
        // const endDateFormat = new Date(`${thisYear}-${thisMonth}-${index}T23:59:59.999Z`)
        let dateIn = `${index}`
        if (index < 10){
            dateIn = `0${index}`
        }
        const startDateFormat = new Date(`2024-08-${dateIn}T00:00:00.000Z`)
        const endDateFormat = new Date(`2024-08-${dateIn}T23:59:59.999Z`)
        const todayData = sampleData.filter(dt=> startDateFormat <= new Date(dt.datetime) && new Date(dt.datetime) <= endDateFormat)
        dateData[`${index}`] = todayData
    }
    const dayList = Object.keys(dateData)
    
    return (
        <div className='upcoming-date'>
            <h1>July</h1>
            {dayList.map((day)=> {
                if (!dateData[day].length){
                    return null
                }
                const dateFormat = `${day}`
                return <UpcomingEachDay date={dateFormat} data={dateData[day]} />
            })}
        </div>
    )
}

export default UpcomingDate