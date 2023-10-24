import "./subscribe-sport.css";
import React from "react";
import homeIcon from "../../icons/home.svg";

const SubscribeSport = () => {
  return (
    <div className="subscribe">
      {/* <div className="sport-logo"></div> */}
      <img src={homeIcon} alt="" className="sport-logo"/>
      <p className="sport-name">TEST</p>
    </div>
  );
};

export default SubscribeSport;
