import "./subscribe-box.css";
import contents from "../../data/upcomingSubscribe";
import SubscribeSport from "../subscribe_sport/SubscribeSport";

const SubscribeBox = () => {
  return (
    <div className="subscribe-box">
      <h5>Subscribe Sport</h5>
      <div className="subscribe-sport">
        {contents.map((content, index) => {
          return <SubscribeSport icon={content.icon} sportname={content.name} key={index}/>;
        })}
      </div>
    </div>
  );
};

export default SubscribeBox;
