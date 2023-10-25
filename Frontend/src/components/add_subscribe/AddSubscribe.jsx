import React from "react";
import "./add_subscribe.css";
import { Icon } from '@iconify/react';

const AddSubscribe = (props) => {
  return (
    <div className="add-subscribe">
      {/* <img src={props.icon} alt={props.sportname} className="add-subscribe-sport-logo" /> */}
      <Icon icon="tabler:play-football" className="add-subscribe-sport-logo"/>
      <p className="add-subscribe-sport-name">TEST</p>
    </div>
  );
};

export default AddSubscribe;
