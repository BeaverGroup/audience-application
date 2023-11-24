/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Icon } from '@iconify/react';
import "./sport-medal.css";
import country from '../../data/country';

const SportMedal = (props) => {
    const dataMedal = props.data
    const result = dataMedal.result
    if (!result) {
        // return (
        //     <tr>
        //         <td className="sport-result-table-name">
        //             <h2>{dataMedal.sport_name}</h2>
        //             <p>{dataMedal.sport_type}</p>
        //         </td>
        //         <td></td>
        //         <td></td>
        //         <td></td>
        //     </tr>
        // )
        return null
    }
    const gold = result.gold
    const silver = result.silver
    const bronze = result.bronze
    return (
        <tr>
            <td className="sport-result-table-name">
                <h2>{dataMedal.sport_name}</h2>
                <p>{dataMedal.sport_type}</p>
            </td>
            <td>
                <div>
                    {gold.map((med) => <div key={med}>
                        <Icon className="country-flag" icon={country[`${med}`] ? country[`${med}`] : "twemoji:flag-" + med.toLowerCase() } />
                        <p>{med}</p>
                    </div>)}
                </div>
            </td>
            <td>
                <div>
                    {silver.map((med) => <div key={med}>
                        <Icon className="country-flag" icon={country[`${med}`] ? country[`${med}`] : "twemoji:flag-" + med.toLowerCase() } />
                        <p>{med}</p>
                    </div>)}
                </div>
            </td>
            <td>
                <div>
                    {bronze.map((med) => <div key={med}>
                        <Icon className="country-flag" icon={country[`${med}`] ? country[`${med}`] : "twemoji:flag-" + med.toLowerCase() } />
                        <p>{med}</p>
                    </div>)}
                </div>
            </td>
        </tr>
    )
}

export default SportMedal