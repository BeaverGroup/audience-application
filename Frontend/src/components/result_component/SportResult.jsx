/* eslint-disable no-unused-vars */
import "./sport-result.css";
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import SportMedal from "./SportMedal";
import { sportData } from "../../data/importAPIData";
import { UserStateContext } from "../../App";
import { useContext } from "react";
import axios from "axios";

const SportResult = () => {
    const { userState, setUserState } = useContext(UserStateContext);
    const [userSubscribe, setSubscribe] = useState([]);
    const [result, setResult] = useState([])
    useEffect(() => {
        sportData().then((data) => setResult(data))
    }, [])
    useEffect(() => {
        const getAllSubs = async () => {
            const port = import.meta.env.VITE_API_PORT;
            const host_ip = import.meta.env.VITE_API_HOST_IP;
            try {
                const userSub = await axios.get(`http://${host_ip}:${port}/user/userAllsub/${userState._id}`, {
                    withCredentials: true,
                });
                setSubscribe(userSub.data.subscribe);
            } catch (e) {
                console.log(e);
            }
        };
        getAllSubs();
    }, [userState]);
    if (!userSubscribe.length) {
        return (
            <div className='sport-result-card'>
                <h1>Sport Result</h1>
                <table className="sport-result-table">
                    <tr>
                        <th><h2>Sport</h2></th>
                        <th><Icon className="country-flag" icon="twemoji:1st-place-medal" /></th>
                        <th><Icon className="country-flag" icon="twemoji:2nd-place-medal" /></th>
                        <th><Icon className="country-flag" icon="twemoji:3rd-place-medal" /></th>
                    </tr>
                    <h3>No sport result found</h3>
                </table>
            </div>
        )
    }
    const sportSubscribe = result.filter((match) => userSubscribe.includes(match.sport_type) && match.round ==="Final")
    return (
        <div className='sport-result-card'>
            <h1>Sport Result</h1>
            <table className="sport-result-table">
                <tr>
                    <th><h2>Sport</h2></th>
                    <th><Icon className="country-flag" icon="twemoji:1st-place-medal" /></th>
                    <th><Icon className="country-flag" icon="twemoji:2nd-place-medal" /></th>
                    <th><Icon className="country-flag" icon="twemoji:3rd-place-medal" /></th>
                </tr>
                {/* <SportMedal name="Badminton" first="China" second="Thailand" third="Japan" /> */}
                {sportSubscribe.map((data)=> <SportMedal key={data.sport_type+data.sport_id} data={data}/>)}
            </table>
            <div>

            </div>
        </div>
    )
}

export default SportResult