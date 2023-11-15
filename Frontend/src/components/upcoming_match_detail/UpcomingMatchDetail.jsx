/* eslint-disable no-unused-vars */
import React from 'react'
import "./upcoming_match_detail.css";
import sampleData from '../../data/sampleData';
import picture from '../../data/sportPicture';

const UpcomingMatchDetail = (props) => {
  const getData = sampleData.filter((data)=> data.sport_id === props.sport_id)
  console.log(getData);
  if (!getData.length){
    return null
  }
  
  return (
    <div className='upcoming-box-detail' id="match-detail">
      <h2>{getData[0].sport_name}</h2>
      <img src={picture[getData[0].sport_type]} alt="" className="sport-image" />
      <div className='detail-box'>
        <p>Sport Name: {getData[0].sport_type}</p>
        <p>Date: {getData[0].datetime}</p>
      </div>
      <div className='match-poll-box'>
        <h4>Match Polls</h4>
        <div className='vote'>
          {getData[0].participating_country.map((data)=> <div className='participant'>{data}</div>)}
        </div>
      </div>
    </div>
  )
}

export default UpcomingMatchDetail