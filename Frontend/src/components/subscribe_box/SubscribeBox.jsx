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
  // console.log(sub)

  const unSubscribe = async (sportName) => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    const data_format = JSON.stringify({
      Sport: sportName
    })
    try {
      const response = await axios.post(`http://${host_ip}:${port}/user/unsubscribe/${userState._id}`, data_format, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
    } catch (e) {
      console.log(e.response.data.error);
    }
  }

  return (
    <div className="subscribe-box">
      <h5>My Subscribe</h5>
      <p className="description">Unsubscribe</p>
      <div className="subscribe-sport">
        {sub && sub.map((content, index) => <SubscribeSport sportname={content} key={index}/>)}
      </div>
    </div>
  );
};

export default SubscribeBox;
