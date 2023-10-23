import React from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";

function MainPage() {
  const { userState, setUserState } = useContext(UserStateContext);
  console.log("userState : ", userState);
  if (!userState) {
    return (
      <div>
        <h1>MainPage</h1>
        <h3> Not found cookie token pls sign in </h3>
      </div>
    );
  }
  const test = async () => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    try {
      const all_user = await axios.get(`http://${host_ip}:${port}/user/list`, {
        withCredentials: true, 
      });
      console.log(all_user.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <h1>MainPage</h1>
        <h3> Token decode data </h3>
        <div>{"Email :  " + userState.Email}</div>
        <div>{"Role :  " + userState.Role}</div>
        <div>{"exp :  " + userState.exp}</div>
        <div>{"iat :  " + userState.iat}</div>
        <div>
          {"** time  : " + new Date(userState.exp * 1000).toLocaleString()}
        </div>
        <button id="button_auth" type="submit" onClick={test}>
          test permission request api
        </button>
      </div>
    </div>
  );
}

export default MainPage;
