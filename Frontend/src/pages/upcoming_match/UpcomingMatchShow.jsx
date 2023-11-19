import { useParams } from "react-router-dom";
import UpcomingDate from "../../components/upcoming_date/UpcomingDate";
import UpcomingMatchDetail from "../../components/upcoming_match_detail/UpcomingMatchDetail";
import "./upcoming-match-show.css";
import { useEffect } from 'react';


const UpcomingMatchShow = () => {
    const { sport_id } = useParams();
    // const {userState, setUserState} = useContext(UserStateContext)
    // console.log(sport_id);
    useEffect(() => {
        const contactSection = document.getElementById("match-detail");
        contactSection.scrollIntoView({ behavior: "smooth", block: "end"})
        // console.log(contactSection)
    }, [sport_id]);

    return (
        <div className="upcoming-page">
            <h1>Upcoming Matches</h1>
            <div className="upcoming-section">
                <UpcomingDate />
            </div>
            <div className="upcoming-detail">
                <UpcomingMatchDetail sport_id={sport_id}/>
            </div>
        </div>
    );
};

export default UpcomingMatchShow;
