import React from 'react'
import DateBox from "../date_box/DateBox"
import "./upcoming-box.css";

const UpcomingBox = () => {
  return (
    <div className='upcoming'>
        <h1 className='upcoming-title'>Upcoming Matches</h1>
        <DateBox/>
        {/* <DateBox/> */}
    </div>
  )
}

export default UpcomingBox