/* eslint-disable no-unused-vars */
import SportResult from "../../components/result_component/SportResult";
import SubscribeBox from "../../components/subscribe_box/SubscribeBox";
// import SubscribeSport from "../../components/subscribe_sport/SubscribeSport";
import "./upcoming-match.css";
import React, { useState, useEffect } from "react";

const UpcomingMatch = () => {
  return (
    <div className="upcoming-matches">
      <SubscribeBox />
      <SportResult />
    </div>
  );
};

export default UpcomingMatch;
