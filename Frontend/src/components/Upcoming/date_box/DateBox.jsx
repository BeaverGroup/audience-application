import React from 'react'
import UpcomingDetail from '../upcoming_detail/UpcomingDetail'
import "./date-box.css";

const DateBox = (props) => {
  return (
    <div className='datebox'>
        <h2 className='date'>1 October</h2>
        <div className='upcoming-list'>
            <UpcomingDetail first={true}/>
            <UpcomingDetail/>
        </div>
    </div>
  )
}

export default DateBox