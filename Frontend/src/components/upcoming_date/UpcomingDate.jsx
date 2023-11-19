import React, { useState, useEffect } from "react";
import './upcoming-date.css'
import UpcomingEachDay from './UpcomingEachDay'
import sampleData from '../../data/sampleData'
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";

const UpcomingDate = () => {
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
    if (!userSportList){
        return (
            <div className='upcoming-date'>
            <h1>August 2024</h1>
            <p>No subscribe sport</p>
        </div>
        )
    }
    
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear();
    const thisDate = today.getDate();
    // const dateAndTime = new Date(data,datetime)
    const dateData = {}
    for (let index = 1; index < 4; index++) {
        // const startDateFormat = new Date(`${thisYear}-${thisMonth}-${index}T00:00:00.000Z`)
        // const endDateFormat = new Date(`${thisYear}-${thisMonth}-${index}T23:59:59.999Z`)
        let dateIn = `${index}`
        if (index < 10) {
            dateIn = `0${index}`
        }
        const startDateFormat = new Date(`2024-08-${dateIn}T00:00:00.000+07:00`)
        const endDateFormat = new Date(`2024-08-${dateIn}T23:59:59.999+07:00`)

        const todayData = sampleData.filter(dt => startDateFormat <= new Date(dt.datetime) && new Date(dt.datetime) <= endDateFormat && userSportList.includes(dt.sport_type))
        // console.log(todayData);
        dateData[`${index}`] = todayData
    }
    const dayList = Object.keys(dateData)

    return (
        <div className='upcoming-date'>
            <h1>August 2024</h1>
            {dayList.map((day) => {
                if (!dateData[day].length) {
                    return null
                }
                const dateFormat = `${day}`
                return <UpcomingEachDay key={day} date={dateFormat} data={dateData[day].sort((p1, p2) => new Date(p1.datetime) - new Date(p2.datetime))} />
            })}
        </div>
    )
}

export default UpcomingDate