import React, { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import "./add_subscribe_box.css";
import contents from "../../data/upcomingSubscribe";
import AddSubscribe from "../add_subscribe/AddSubscribe";
import axios from "axios";

const AddSubscribeBox = () => {
  const { userState, setUserState } = useContext(UserStateContext);
  const [ userSubscribe, setSubscribe] = useState([]);

  const addSub = async () => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    const data_format = JSON.stringify({
      Sport: "Test"
    })
    try {
      const response = await axios.post(`http://${host_ip}:${port}/user/subscribe/${userState._id}`, data_format, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(response);
    } catch (e) {
      // console.log(e);
    }
  }

  return (
    <div className="add-subscribe-box">
      <h5>Add Subscribe</h5>
      <div className="add-subscribe-sport" onClick={addSub}>
        {contents.map((content, index) => {
          return (
            <AddSubscribe icon={content.icon} sportname={content.sportname} key={index}/>
          );
        })}
      </div>
    </div>
  );
};

export default AddSubscribeBox;
