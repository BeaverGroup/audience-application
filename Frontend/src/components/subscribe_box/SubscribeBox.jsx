import "./subscribe-box.css";
import picture from "../../data/subscribeResult";
import SubscribeSport from "../subscribe_sport/SubscribeSport";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";

const SubscribeBox = (props) => {
  const { userState, setUserState } = useContext(UserStateContext);
  const sub = props.subscription
  console.log(sub)
  return (
    <div className="subscribe-box">
      <h5>My Subscribe</h5>
      <p className="description">Unsubscribe</p>
      <div className="subscribe-sport">
        {sub && sub.map((content, index) => <SubscribeSport icon={picture[content]} sportname={content} key={index}/>)}
      </div>
    </div>
  );
};

export default SubscribeBox;
