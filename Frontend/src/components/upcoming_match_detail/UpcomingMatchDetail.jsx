/* eslint-disable no-unused-vars */
import "./upcoming_match_detail.css";
import sampleData from '../../data/sampleData';
import picture from '../../data/sportPicture';
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";
import { sportData } from "../../data/importAPIData";

const UpcomingMatchDetail = (props) => {
  const { userState, setUserState } = useContext(UserStateContext);
  const [userVote, setUserVote] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [voteCountry, setVoteCountry] = useState("");
  const [sportList, setSportList] = useState([])

  const addVote = async (matchid, votefor) => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    const data_format = JSON.stringify({
      matchID: matchid,
      vote: votefor,
    })
    try {
      const response = await axios.post(`http://${host_ip}:${port}/user/vote/${userState._id}`, data_format, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(matchid);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const getUserVote = async () => {
      const port = import.meta.env.VITE_API_PORT;
      const host_ip = import.meta.env.VITE_API_HOST_IP;
      try {
        const myvote = await axios.get(`http://${host_ip}:${port}/user/userAllvote/${userState._id}`, {
          withCredentials: true,
        });
        setUserVote(myvote.data.votes)
        // setIsVoted(true)
        // console.log(myvote.data.votes);
      } catch (e) {
        console.log(e);
      }
    }
    getUserVote();
  }, [userVote, userState]);


  useEffect(() => {
    const matchIDToCheck = props.sport_id;
    if (userVote) {
      const isMatchIDExist = userVote.find(item => item.matchID === matchIDToCheck) !== undefined;
      const index = userVote.findIndex(item => item.matchID === matchIDToCheck);
      if (isMatchIDExist) {
        const voteCountry = userVote[index].vote;
        setVoteCountry(voteCountry);
        // console.log(voteCountry);
        // console.log(`MatchID ${matchIDToCheck} exists in the array at index ${index}.`);
      } else {
        // console.log(`MatchID ${matchIDToCheck} does not exist in the array.`);
      }
    } else {
      setUserVote([])
    }
  }, [props.sport_id, userVote]);

  useEffect(() => {
    sportData().then((data) => setSportList(data))
  }, [])
  const getData = sportList.filter((data) => data.sport_id === props.sport_id)
  // console.log(getData);
  if (!getData.length) {
    return (
      <div className='upcoming-box-detail' id="match-detail">
        <h2>Don't find sport detail</h2>
      </div>
    )
  }
  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dateAndTime = new Date(getData[0].datetime)
  const getDayOfWeek = dayOfWeek[dateAndTime.getDay()] // Example: Monday
  const timeString = dateAndTime.toTimeString()
  const dateString = dateAndTime.toDateString().slice(3) // slice day of the week out
  const finalTime = `${getDayOfWeek}, ${dateString}`

  return (
    <div className='upcoming-box-detail' id="match-detail">
      <h2>{getData[0].sport_name}</h2>
      <img src={picture[getData[0].sport_type]} alt="" className="sport-image" />
      <div className='detail-box'>
        <p>Sport Name: {getData[0].sport_type}</p>
        <p>Date: {finalTime}</p>
        <p>Time: {timeString}</p>
      </div>
      <div className='match-poll-box'>
        <h4>Match Polls</h4>
        <div className='vote'>
          {getData[0].participating_country.map((data, index) => <div key={index} className={`participant ${voteCountry === data ? 'change-background' : ''}`} onClick={() => addVote(getData[0].sport_id, data)}>{data}</div>)}
        </div>
      </div>
    </div>
  )
}

export default UpcomingMatchDetail