import React from "react";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import ProfileBar from "../../components/ProfileBar";

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
      </div>
    </div>
  );
}

export default MainPage;
