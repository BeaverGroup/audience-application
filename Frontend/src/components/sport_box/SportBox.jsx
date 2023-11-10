import "./sport_box.css"
import addIcon from "../../icons/add.svg"
function SportBox(props) {
    const { sport } = props;
    return (
        <div className="sport-card">
            <div className="img-box">
                <img src={sport.image_url} alt="" />
            </div>
            <div className="sport-name">{sport.name}</div>
            <div className="sport-detail">{sport.name} <div className="description"> {sport.description} </div></div>
            <div className="add-icon">
                <img src={addIcon} alt="" />
            </div>
        </div>
    );
}

export default SportBox;