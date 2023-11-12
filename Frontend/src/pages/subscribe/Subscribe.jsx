/* eslint-disable no-unused-vars */
import AddSubscribeBox from "../../components/add_subscribe_box/AddSubscribeBox";
import SportResult from "../../components/result_component/SportResult";
import SubscribeBox from "../../components/subscribe_box/SubscribeBox";
import "./subscribe.css";
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
    <div className="subscribes">
      <div className="sport-bar">
        <SubscribeBox />
        <AddSubscribeBox />
      </div>
      <div className="sport-result-medal">
        <SportResult />
      </div>

    </div>
  );
};

export default UpcomingMatch;
