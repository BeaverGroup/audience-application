/* eslint-disable no-unused-vars */
import "./sport-result.css";
import React from 'react'
import { Icon } from '@iconify/react';

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
                <tr>
                    <td className="sport-result-table-name">
                        <h2>Badminton</h2>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-spain" />
                            <p>Spain</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-france" />
                            <p>France</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-china" />
                            <p>China</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="sport-result-table-name">
                        <h2>Football</h2>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-brazil" />
                            <p>Brazil</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-england" />
                            <p>England</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-germany" />
                            <p>Germany</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="sport-result-table-name">
                        <h2>Basketball</h2>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-united-states" />
                            <p>Thailand</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-france" />
                            <p>France</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <Icon className="country-flag" icon="twemoji:flag-china" />
                            <p>China</p>
                        </div>
                    </td>
                </tr>
            </table>
            <div>

            </div>
        </div>
    )
}

export default SportResult