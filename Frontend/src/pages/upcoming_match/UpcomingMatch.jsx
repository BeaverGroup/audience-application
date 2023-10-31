/* eslint-disable no-unused-vars */
import UpcomingMatchDetail from "../../components/upcoming_match_detail/UpcomingMatchDetail";
import "./upcoming-match.css";
import React, { useState, useEffect } from "react";

const UpcomingMatch = () => {
  return (
    <div className="upcoming-page">
      <UpcomingMatchDetail/>
    </div>
  );
};

export default UpcomingMatch;
