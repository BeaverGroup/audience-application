/* eslint-disable no-unused-vars */
import AddSubscribeBox from "../../components/add_subscribe_box/AddSubscribeBox";
import SportResult from "../../components/result_component/SportResult";
import SubscribeBox from "../../components/subscribe_box/SubscribeBox";
import "./subscribe.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";
import { getAllSubs } from "../../services/Services";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const Subscribe = () => {
  const { userState, setUserState } = useContext(UserStateContext);
  const [userSubscribe, setSubscribe] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(userSubscribe)



  useEffect(() => {
    getAllSubs(userState).then((data) => {
      setSubscribe(data.subscribe)
      setLoading(false)
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const element = document.querySelector(":root");
    element.style.setProperty("--text-horizontal-nav", "var(--blue)");
    if (!document.querySelector(".scrolled")) {
      element.style.setProperty("--text-horizontal-nav", "var(--blue)");
    }
  }, []);

  return (
    <div className="subscribes">
      <h1 className="page-title">
        SUBSCRIPTIONS
      </h1>
      <div className="sport-bar">
        {loading ?
        <Stack spacing={1}>
        <Skeleton animation="wave" variant="rounded" width="100%" height="50px"  /> 
        <Skeleton animation="wave" variant="rounded" width="100%" height="30px"  /> 
        <Skeleton animation="wave" variant="rounded" width="100%" height="30px"  /> 
        </Stack>
        : 
        <SubscribeBox subscription={userSubscribe} />}

        {/* <AddSubscribeBox /> */}
      </div>
      <div className="sport-result-medal">
        <SportResult />
      </div>

    </div>
  );
};

export default Subscribe;
