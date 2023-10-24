/* eslint-disable no-unused-vars */
import SportResult from "../../components/result_component/SportResult";
import "./upcoming-match.css";
import React, { useState, useEffect } from "react";

const UpcomingMatch = () => {
  return (
    <div className="upcoming-matches">
      <SportResult/>
    </div>
  )
}

export default UpcomingMatch