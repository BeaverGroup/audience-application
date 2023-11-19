import React, {
  Fragment,
  createContext,
  useEffect,
  useState,
  Navigate,
} from "react";

import ProfileBar from "./components/NavAuthDemo";
import LoginPage from "./pages/auth/LoginPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/main/MainPageDemo";
import RegisterPage from "./pages/auth/RegisterPage";
import AssignPage from "./pages/auth/AssignPage";

import checkToken from "./services/checkToken";
import Cookies from "js-cookie";

import UpcomingMatch from "./pages/upcoming_match/UpcomingMatch";
import UpcomingMatchShow from "./pages/upcoming_match/UpcomingMatchShow";
import Subscribe from "./pages/subscribe/Subscribe";
import Home from "./pages/home/Home";
import HorizontalNav from "./components/horizontal_navbar/HorizontalNav";
import VerticalNav from "./components/vertical_navbar/VerticalNav";
import { widthToChangeNav, heightToChangeNav } from "./services/constants";

const UserStateContext = createContext();

function App() {
  const authToken = Cookies.get("authToken");
  console.log("Cookie_token :  ", authToken);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const [userState, setUserState] = useState(null); // login?
  const [enableAssignPage, setEnableAssignPage] = useState(false); // login?
  console.log(userState);

  useEffect(() => {
    checkToken(setUserState);
  }, []);

  useEffect(() => {
    const handleResizeWindow = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    // userState is data of user from token that decoded
    <UserStateContext.Provider value={{ userState, setUserState }}>
      {/* <ProfileBar user_email={userState ? userState["Email"] : null} /> */}
      {userState ? (
        <Fragment>
          <HorizontalNav user_email={userState ? userState["Email"] : null} />
          {screenWidth < widthToChangeNav || screenHeight < heightToChangeNav ? (
            ""
          ) : (
            <VerticalNav />
          )}       
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          {/* <Route path="/upcoming" element={<UpcomingMatch/>}/> */}
          <Route path="/upcoming" element={<UpcomingMatch/>}/>
          <Route path="/upcoming/:sport_id" element={<UpcomingMatchShow/>}/>
          <Route path="/subscribe" element={<Subscribe/>}/>
        </Routes>
      </Fragment>
      ) : (
        <Routes>
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route
            path="/"
            element={<LoginPage setEnableAssignPage={setEnableAssignPage} />}
          />
          {enableAssignPage ? (
            <Route path="/assign-info" element={<AssignPage />} />
          ) : null}
        </Routes>
   )}
    </UserStateContext.Provider>
  );
}

export { UserStateContext };
export default App;
