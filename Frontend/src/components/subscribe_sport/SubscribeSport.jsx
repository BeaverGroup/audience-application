import "./subscribe-sport.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";

const SubscribeSport = (props) => {
  const { userState, setUserState } = useContext(UserStateContext);
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
    <div className="subscribe" onClick={() => unSubscribe(props.sportname)}>
      <img src={props.icon} alt={props.sportname} className="sport-logo"/>
      <p className="sport-name">{props.sportname}</p>
    </div>
  );
};

export default SubscribeSport;
