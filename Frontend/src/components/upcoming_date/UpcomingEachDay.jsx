import React from "react";
import "./upcoming-each-day.css";
import UpcomingList from "./UpcomingList";

const UpcomingEachDay = (props) => {
    const dataInDay = props.data;
    console.log(dataInDay);
    const intToDate = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    return (
        <div className="upcoming-each-day">
            <div className="each-day-date">{props.date} {intToDate[new Date(dataInDay[0].datetime).getDay()]}</div>
            <div className="each-day-list">
                {dataInDay.map((day) => {
                    const newTime = new Date(
                        day.datetime.slice(0, 19).concat("Z")
                    );

                    return (
                        <UpcomingList
                            key={day.sport_id}
                            link={"/upcoming/" + day.sport_id}
                            name={day.sport_name}
                            sport={day.sport_type}
                            time={newTime.toLocaleTimeString()}
                            data={day}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default UpcomingEachDay;
