/* eslint-disable no-unused-vars */
import "./sport-result.css";
import React from 'react'
import { Icon } from '@iconify/react';
import SportMedal from "./SportMedal";

const SportResult = () => {
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
                <SportMedal name="Badminton" first="China" second="Thailand" third="Japan" />
            </table>
            <div>

            </div>
        </div>
    )
}

export default SportResult