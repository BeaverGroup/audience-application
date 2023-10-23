import React, { Fragment, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import ProfileBar from "./components/NavAuthDemo";
import LoginPage from "./pages/auth/LoginPage";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/main/MainPageDemo";
import RegisterPage from "./pages/auth/RegisterPage";

const UserStateContext = createContext();

function App() {
  const [userState, setUserState] = useState(null); // login?

  useEffect(() => {
    try {
      const authToken = Cookies.get("authToken");
      console.log("authToken", authToken);
      if (!authToken) {
        console.log("Cookie_token not found");
      } else {
        // use api login user by sent mail and google token for verify
        const authToken = Cookies.get("authToken");
        const decodedToken = jwt_decode(authToken);

        if (decodedToken) {
          console.log("DecodedToken : ", decodedToken);
          setUserState(decodedToken);

          // window.location.reload();
        } else {
          console.log("DecodedToken : ", decodedToken);
          console.log("Token expired or Token not found or Token invalid");
          Cookies.remove("authToken");
          // window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
      Cookies.remove("authToken");
    }
  }, []);
  return (
    <UserStateContext.Provider value={{ userState, setUserState }}>
      <ProfileBar user_email={userState ? userState["Email"] : null} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {userState ? null : (
          <Fragment>
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route path="/sign-in" element={<LoginPage />} />
          </Fragment>
        )}
      </Routes>
    </UserStateContext.Provider>
  );
}

export { UserStateContext };
export default App;
