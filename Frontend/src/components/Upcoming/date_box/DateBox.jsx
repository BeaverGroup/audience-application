import UpcomingDetail from '../upcoming_detail/UpcomingDetail'
import "./date-box.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../../App";
import axios from "axios";
import sampleData from '../../../data/sampleData'

const DateBox = (props) => {
  const { userState, setUserState } = useContext(UserStateContext);
  const [userSubscribe, setSubscribe] = useState([]);
  useEffect(() => {
    const getAllSubs = async () => {
      const port = import.meta.env.VITE_API_PORT;
      const host_ip = import.meta.env.VITE_API_HOST_IP;
      try {
        const userSub = await axios.get(`http://${host_ip}:${port}/user/userAllsub/${userState._id}`, {
          withCredentials: true,
        });
        setSubscribe(userSub.data.subscribe);
        console.log(userSub.data.subscribe);
      } catch (e) {
        console.log(e);
      }
    };
    getAllSubs();
    // Remove userSubscribe from the dependency array
  }, [userState]);
  let userSportList = userSubscribe

  if (!userSportList) {
    return (
      <div className='datebox'>
        <div className='upcoming-list'>
          <h3>No upcoming Match</h3>
          <h3>Please subscribe sport</h3>
        </div>
      </div>
    )
  }
  else {

    let nearMatch = sampleData.filter((dt) => userSportList.includes(dt.sport_type)).sort((p1, p2) => new Date(p1.datetime) - new Date(p2.datetime))
    const nearDate = nearMatch[0]
    console.log(nearDate);

    return (
      <div className='datebox'>
        <h2 className='date'>1 October</h2>
        <div className='upcoming-list'>
          <UpcomingDetail first={true} />
          <UpcomingDetail />
        </div>
      </div>
    )
  }
}

export default DateBox