import UpcomingBox from '../../components/Upcoming/upcoming_box/UpcomingBox'
import SportResult from '../../components/result_component/SportResult'
import './home.css'
import parisIcon from "../../icons/paris-icon.svg"

const Home = () => {
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
                    <UpcomingBox/>
                    </div>
                    <div className="result-box">
                    <SportResult/>
                    </div>
                    
        
                </div>
                <div className="sports-section">
                    <h2 className='sports-title'>Sports</h2>
                </div>
            </div>
        </div>
    )
}

export default Home