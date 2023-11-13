/* eslint-disable no-unused-vars */
import UpcomingDate from "../../components/upcoming_date/UpcomingDate";
import UpcomingMatchDetail from "../../components/upcoming_match_detail/UpcomingMatchDetail";
import "./upcoming-match.css";
import React, { useState, useEffect } from "react";

const UpcomingMatch = () => {

  useEffect(() => {
      const element = document.querySelector(":root");
      element.style.setProperty("--text-horizontal-nav", "var(--blue)");
      if (!document.querySelector(".scrolled")) {
          element.style.setProperty("--text-horizontal-nav", "var(--blue)");
      }
    }, []);

  return (
    <div className="upcoming-page">
      <h1>Upcoming Matches</h1>
      <div className="upcoming-section">
        <UpcomingDate />
      </div>
    </div>
  );
};

export default UpcomingMatch;
