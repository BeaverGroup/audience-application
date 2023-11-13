import React from "react";
import "./add_subscribe_box.css";
import contents from "../../data/upcomingSubscribe";
import AddSubscribe from "../add_subscribe/AddSubscribe";

const AddSubscribeBox = () => {
  return (
    <div className="add-subscribe-box">
      <h5>Add Subscribe</h5>
      <div className="add-subscribe-sport">
        {contents.map((content, index) => {
          return (
            <AddSubscribe icon={content.icon} sportname={content.sportname} key={index}/>
          );
        })}
      </div>
    </div>
  );
};

export default AddSubscribeBox;
