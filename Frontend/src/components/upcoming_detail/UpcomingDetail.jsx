import React from "react";
import "./upcoming-detail.css";
import { Icon } from "@iconify/react";

const UpcomingDetail = (props) => {
  if (props.first) {
    return (
      <div className="detail-box-grey">
        <Icon icon="tabler:play-football" className="sport-logo" />
        <div className="match-detail">
          <h3 className="sport-name">Basketball</h3>
          <p>England vs Thailand</p>
        </div>
        <div className="time">
          <p>1.00PM - 3.00PM</p>
        </div>
      </div>
    );
  }
  return (
    <div className="detail-box-white">
      <Icon icon="tabler:play-football" className="sport-logo" />
      <div className="match-detail">
        <h3 className="sport-name">Basketball</h3>
        <p>England vs Thailand</p>
      </div>
      <div className="time">
        <p>1.00PM - 3.00PM</p>
      </div>
    </div>
  );
};

export default UpcomingDetail;
