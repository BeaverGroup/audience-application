import React from 'react'
import "./upcoming_match_detail.css";

const UpcomingMatchDetail = () => {
  return (
    <div className='upcoming-box-detail'>
      <h2>England vs Thailand</h2>
      <img src="https://cdn.britannica.com/51/190751-050-147B93F7/soccer-ball-goal.jpg" alt="" className="sport-image" />
      <div className='detail-box'>
        <p>Sportname: </p>
        <p>Date: </p>
        <p>Other Detail: </p>
      </div>
      <div className='match-poll-box'>
        <h4>Match Polls</h4>
        <div className='vote'>
          <div className='participant'>Thailand</div>
          <div className='participant'>England</div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingMatchDetail