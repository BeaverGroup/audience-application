import React from 'react'
import './upcoming-list.css'
import { Link } from 'react-router-dom'

const UpcomingList = (props) => {
    const data = props.data
    return (
        <div className='upcoming-list'>
            <Link to={props.link}>
                <h4>{props.name}</h4>
                <p>{props.sport}</p>
                <h5>{props.time}</h5>
            </Link>
        </div>
    )
}

export default UpcomingList