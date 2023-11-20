import UpcomingBox from '../../components/Upcoming/upcoming_box/UpcomingBox'
import SportResult from '../../components/result_component/SportResult'
import './home.css'
import parisIcon from "../../icons/paris-icon.svg"
import sports from "../../data/sports"
import { useState, useEffect, useContext } from 'react';
import SportBox from '../../components/sport_box/SportBox'
import { UserStateContext } from "../../App";
import axios from "axios";


const getFiltered = (text, items) => {
    if (!text) {
        return items
    }
    return items.filter((sport) => sport.name.toLowerCase().includes(text.toLowerCase()))
}

const Home = () => {
    const element = document.querySelector(":root");
    if (!document.querySelector(".scrolled") && window.innerWidth > 900) {
        element.style.setProperty("--text-horizontal-nav", "white");
    }
    
    const { userState, setUserState } = useContext(UserStateContext);
    const [ userSubscribe, setSubscribe ] = useState([]);

    const [text, setText] = useState("");

    const filteredItems = getFiltered(text, sports)

    useEffect(() => {
        const getAllSubs = async () => {
          const port = import.meta.env.VITE_API_PORT;
          const host_ip = import.meta.env.VITE_API_HOST_IP;
          try {
            const userSub = await axios.get(`http://${host_ip}:${port}/user/userAllsub/${userState._id}`, {
              withCredentials: true,
            });
            setSubscribe(userSub.data.subscribe)
            console.log(userSubscribe);
          } catch (e) {
            console.log(e);
          }
        }
        getAllSubs();
      }, [userState, userSubscribe]);

    return (
        <div className='homepage'>
            <div className="section-1">
                <div className="title">
                    <img src={parisIcon} alt="" className="paris-logo" />
                    <h1 className='title-text'>
                        OLYMPIC GAMES <br /> PARIS 2024
                    </h1>
                </div>
            </div>
            <div className="section-2">
                <div className="news-section">
                    <h2 className='news-title'>NEWS from your subscribe</h2>
                    <div className='upcoming-box'>
                        <UpcomingBox />
                    </div>
                    <div className="result-box">
                        <SportResult />
                    </div>


                </div>
                <div className="sports-section">
                    <h2 className='sports-title'>Sports</h2>
                    <div className='search-sport'>
                        <input placeholder='Search...' type="text" onChange={(e) => setText(e.target.value)} />
                    </div>
                    {filteredItems.map((item, index) => {
                        return <SportBox sport={item} key={index} subscribed={userSubscribe}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home