import UpcomingBox from '../../components/upcoming_box/UpcomingBox'
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
                    <h2>NEWS from your subscribe</h2>
                </div>
                <UpcomingBox/>
                <div className="sports-section">
                    <h2>Sports</h2>
                </div>
            </div>
        </div>
    )
}

export default Home