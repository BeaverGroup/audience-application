import React from 'react'
import DateBox from "../date_box/DateBox"
import "./upcoming-box.css";
import { Link } from 'react-router-dom';

const UpcomingBox = () => {
  return (
    <div className='upcoming'>
        <Link to="/upcoming">
          <h1 className='upcoming-title'>Upcoming Matches</h1>
        </Link>
        <DateBox/>
        {/* <DateBox/> */}
    </div>
  )
}

export default UpcomingBox