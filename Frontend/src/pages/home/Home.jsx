import UpcomingBox from '../../components/Upcoming/upcoming_box/UpcomingBox'
import SportResult from '../../components/result_component/SportResult'
import './home.css'
import parisIcon from "../../icons/paris-icon.svg"
import sports from "../../data/sports"
import { useState } from 'react';
import SportBox from '../../components/sport_box/SportBox'


const getFiltered = (text, items) => {
    if (!text) {
        return items
    }
    return items.filter((sport) => sport.name.toLowerCase().includes(text.toLowerCase()))
}

const Home = () => {
    const element = document.querySelector(":root");

    if (!document.querySelector(".scrolled")) {
        element.style.setProperty("--text-horizontal-nav", "white");
    }

    const [text, setText] = useState("");

    const filteredItems = getFiltered(text, sports)


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
                        return <SportBox sport={item} key={index}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home