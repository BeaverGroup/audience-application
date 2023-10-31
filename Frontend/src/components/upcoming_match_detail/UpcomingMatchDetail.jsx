import React from 'react'
import "./upcoming_match_detail.css";

const UpcomingMatchDetail = () => {
  return (
    <div className='upcoming-box-detail'>
      <h2>England VS Thailand</h2>
      <div>
        <p>Sportname: </p>
        <p>Date: </p>
        <p>Other Detail: </p>
      </div>
      <div>
        Match Polls
        <div>
          <button>Thailand</button>
          <button>England</button>
        </div>
      </div>
    </div>
  )
}

export default UpcomingMatchDetail