/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Icon } from '@iconify/react';
import "./sport-medal.css";

const SportMedal = (props) => {
    return (
        <tr>
            <td className="sport-result-table-name">
                <h2>{props.name}</h2>
            </td>
            <td>
                <div>
                    <Icon className="country-flag" icon={"twemoji:flag-" + props.first.toLowerCase()} />
                    <p>{props.first}</p>
                </div>
            </td>
            <td>
                <div>
                    <Icon className="country-flag" icon={"twemoji:flag-" + props.second.toLowerCase()} />
                    <p>{props.second}</p>
                </div>
            </td>
            <td>
                <div>
                    <Icon className="country-flag" icon={"twemoji:flag-" + props.third.toLowerCase()} />
                    <p>{props.third}</p>
                </div>
            </td>
        </tr>
    )
}

export default SportMedal