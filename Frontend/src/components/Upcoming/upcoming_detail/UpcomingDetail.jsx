import React from "react";
import "./upcoming-detail.css";
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom'

const UpcomingDetail = (props) => {
  const sportMatch = props.data
  // console.log(sportMatch);
  const newTime = new Date(
    sportMatch.datetime.slice(0, 19).concat("Z")
  );
  return (
    <Link to={`/upcoming/${sportMatch.sport_id}`}>
      <div className="detail-box-white">
        <Icon icon="tabler:play-football" className="sport-logo" />
        <div className="match-detail">
          <h3 className="sport-name">{sportMatch.sport_name}</h3>
          <h5>{sportMatch.sport_type}</h5>
          <h4>{newTime.toLocaleTimeString()}</h4>
        </div>
      </div>
    </Link>
  );
};

export default UpcomingDetail;
