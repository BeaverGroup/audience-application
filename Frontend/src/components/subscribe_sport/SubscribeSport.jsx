import "./subscribe-sport.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";
import { Icon } from '@iconify/react';
import sports from "../../data/sports";
import { unSubscribe } from "../../services/Services";

const SubscribeSport = (props) => {
  const { userState, setUserState } = useContext(UserStateContext);
  const findSport = sports.find((data)=> data.name === props.sportname)
  const unSubscribeSport = () => {
    unSubscribe(userState, props.sportname)
    location.reload()
  }
  return (
    <div className="subscribe">
      <Icon icon={findSport.icon?findSport.icon:"game-icons:sport-medal"}  width="20" height="20"/>
      <p className="sport-name">{props.sportname}</p>
      <Icon className="icon-x" icon="octicon:x-12" width="20" height="20" onClick={unSubscribeSport}/>
    </div>
  );
};

export default SubscribeSport;
