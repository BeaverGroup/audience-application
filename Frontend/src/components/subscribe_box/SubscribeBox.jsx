import "./subscribe-box.css";
import picture from "../../data/subscribeResult";
import SubscribeSport from "../subscribe_sport/SubscribeSport";

const SubscribeBox = (props) => {
  const sub = props.subscription
  console.log(sub)
  return (
    <div className="subscribe-box">
      <h5>Subscribe Sport</h5>
      <div className="subscribe-sport">
        {sub.map((content, index) => <SubscribeSport icon={picture[content]} sportname={content} key={index}/>)}
      </div>
    </div>
  );
};

export default SubscribeBox;
