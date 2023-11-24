import React from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import axios from "axios";

function MainPage() {
  const { userState, setUserState } = useContext(UserStateContext);
  // console.log("userState : ", userState);
  const test = async () => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    try {
      const all_user = await axios.get(`http://${host_ip}:${port}/user/list`, {
        withCredentials: true,
      });
      // console.log(all_user.data);
    } catch (e) {
      // console.log(e);
    }
  };
  const health = async () => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    try {
      const all_user = await axios.get(`http://${host_ip}:${port}/health`, {
        withCredentials: true,
      });
      // console.log(all_user.data);
    } catch (e) {
      // console.log(e);
    }
  };
  if (!userState) {
    return (
      <div>
        <h1>MainPage</h1>
        <h3> Not found cookie token pls sign in </h3>
        <button
          style={{ width: "70%", height: "50px" }}
          id="button_auth"
          type="submit"
          onClick={health}
        >
          test request api (non auth)
        </button>
      </div>
    );
  }

  const getByEmail = async () => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    try {
      const userEmail = await axios.get(`http://${host_ip}:${port}/user/infoByEmail/natekrth@gmail.com`, {
        withCredentials: true,
      });
      // console.log(userEmail.data);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: " center",
      }}
    >
      <div
        style={{
          border: "0.15rem solid #DCD8FD",
          // padding: "1rem 7rem 14rem 28rem",
          padding: "2rem 0rem",
          borderRadius: "0.8rem",
          width: "30%",
          backgroundColor: "#E9E7F8",
          color: "#545353",
        }}
      >
        <h1>MainPage</h1>
        <h3> Token decode data </h3>
        <div>{"Email :  " + userState.Email}</div>
        <div>{"Role :  " + userState.Role}</div>
        <div>{"exp :  " + userState.exp}</div>
        <div>{"iat :  " + userState.iat}</div>
        <div>
          {"** time  : " +
            new Date(userState.exp * 1000 + 60000).toLocaleString()}
        </div>
        <button
          style={{ width: "70%", height: "50px" }}
          id="button_auth"
          type="submit"
          onClick={getByEmail}
        >
          test permission request api
        </button>
      </div>
    </div>
  );
}

export default MainPage;
