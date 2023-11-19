/* eslint-disable no-unused-vars */
import AddSubscribeBox from "../../components/add_subscribe_box/AddSubscribeBox";
import SportResult from "../../components/result_component/SportResult";
import SubscribeBox from "../../components/subscribe_box/SubscribeBox";
import "./subscribe.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";

const Subscribe = () => {
  const { userState, setUserState } = useContext(UserStateContext);
  const [ userSubscribe, setSubscribe] = useState([]);

  useEffect(() => {
    const getAllSubs = async () => {
      const port = import.meta.env.VITE_API_PORT;
      const host_ip = import.meta.env.VITE_API_HOST_IP;
      try {
        const userSub = await axios.get(`http://${host_ip}:${port}/user/userAllsub/${userState._id}`, {
          withCredentials: true,
        });
        setSubscribe(userSub.data.subscribe)
        console.log(userSubscribe);
      } catch (e) {
        console.log(e);
      }
    }
    getAllSubs();
  }, [userState, userSubscribe]);
  
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
        <SubscribeBox subscription={userSubscribe}/>
        {/* <AddSubscribeBox /> */}
      </div>
      <div className="sport-result-medal">
        <SportResult />
      </div>

    </div>
  );
};

export default Subscribe;
