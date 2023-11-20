import "./subscribe-sport.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";
import { Icon } from '@iconify/react';
import sports from "../../data/sports";

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
  const findSport = sports.find((data)=> data.name === props.sportname)
  return (
    <div className="subscribe">
      <Icon icon={findSport.icon?findSport.icon:"game-icons:sport-medal"}  width="20" height="20"/>
      <p className="sport-name">{props.sportname}</p>
      <Icon className="icon-x" icon="octicon:x-12" width="20" height="20" onClick={() => unSubscribe(props.sportname)}/>
    </div>
  );
};

export default SubscribeSport;
