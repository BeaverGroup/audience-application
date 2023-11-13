import "./subscribe-sport.css";
import React from "react";

const SubscribeSport = (props) => {
  return (
    <div className="subscribe">
      {/* <img src={props.icon} alt={props.sportname} className="sport-logo"/> */}
      <p className="sport-name">{props.sportname}</p>
    </div>
  );
};

export default SubscribeSport;
