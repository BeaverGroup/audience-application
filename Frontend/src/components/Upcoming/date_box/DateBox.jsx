import UpcomingDetail from '../upcoming_detail/UpcomingDetail'
import "./date-box.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../../App";
import axios from "axios";
import sampleData from '../../../data/sampleData'
import { sportData } from '../../../data/importAPIData';

const DateBox = (props) => {
  const { userState, setUserState } = useContext(UserStateContext);
  const [userSubscribe, setSubscribe] = useState([]);
  const [sportList, setSportList] = useState([]);
  useEffect(() => {
    const getAllSubs = async () => {
      const port = import.meta.env.VITE_API_PORT;
      const host_ip = import.meta.env.VITE_API_HOST_IP;
      try {
        const userSub = await axios.get(`http://${host_ip}:${port}/user/userAllsub/${userState._id}`, {
          withCredentials: true,
        });
        setSubscribe(userSub.data.subscribe);
        // console.log(userSub.data.subscribe);
      } catch (e) {
        // console.log(e);
      }
    };
    getAllSubs();
    // Remove userSubscribe from the dependency array
  }, [userState]);
  useEffect(() => {
    sportData().then((data) => setSportList(data))
  }, [])

  let userSportList = userSubscribe.map((re)=> re.toUpperCase());

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
    const todayDate = new Date('2024-08-01T01:00:00Z')
    let todayDateNum = todayDate.getDate()
    let todayMonth = todayDate.getMonth() + 1
    const todayYear = todayDate.getFullYear()
    if (todayMonth < 10) {
      todayMonth = `0${todayMonth}`
    }
    if (todayDateNum < 10) {
      todayDateNum = `0${todayDateNum}`
    }
    const startDateTime = new Date(`${todayYear}-${todayMonth}-${todayDateNum}T00:00:00.000+07:00`)
    const endDateTime = new Date(`${todayYear}-${todayMonth}-${todayDateNum}T23:59:59.999+07:00`)
    // console.log(endDateTime);
    const nearMatch = sportList.filter((dt) => userSportList.includes(dt.sport_type) && new Date(dt.datetime) >= startDateTime && new Date(dt.datetime) <= endDateTime).sort((p1, p2) => new Date(p1.datetime) - new Date(p2.datetime))
    // NOT USE IN DEMO BECAUSE OF MANY FUTURE DATA
    // const nearDate = nearMatch[0]
    // const convertTimeFormat = nearDate?.datetime
    // if (!convertTimeFormat) {
    //   return (
    //     <div className='datebox'>
    //       <div className='upcoming-list'>
    //         <h3>No upcoming Match</h3>
    //         <h3>Please subscribe sport</h3>
    //       </div>
    //     </div>
    //   )
    // }
    // const datetimeFormat = new Date(
    //   convertTimeFormat.slice(0, 19).concat("Z")
    // )
    // console.log(nearMatch);
    return (
      <div className='datebox'>
        <h2 className='date'>1 August</h2>
        <div className='upcoming-list-datebox'>
          {nearMatch.map((match) => <UpcomingDetail key={match.sport_id} data={match} />)}
        </div>
      </div>
    )
  }
}

export default DateBox