import React from 'react'
import './upcoming-list.css'

const UpcomingList = (props) => {
    return (
        <div className='upcoming-list'>
            <h4>{props.name}</h4>
            <p>{props.sport}</p>
            <h5>{props.time}</h5>
        </div>
    )
}

export default UpcomingList