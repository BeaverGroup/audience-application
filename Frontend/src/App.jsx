import React, {
  Fragment,
  createContext,
  useEffect,
  useState,
  Navigate,
} from "react";

import ProfileBar from "./components/NavAuthDemo";
import LoginPage from "./pages/auth/LoginPage";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/main/MainPageDemo";
import RegisterPage from "./pages/auth/RegisterPage";
import AssignPage from "./pages/auth/AssignPage";
import checkToken from "./services/checkToken";
import Cookies from "js-cookie";

const UserStateContext = createContext();

function App() {
  const authToken = Cookies.get("authToken");
  console.log("Cookie_token :  ", authToken);
  const [userState, setUserState] = useState(null); // login?
  const [enableAssignPage, setEnableAssignPage] = useState(false); // login?
  console.log(userState);
  console.log(Cookies.fet);
  useEffect(() => {
    checkToken(setUserState);
  }, []);
  return (
    // userState is data of user from token that decoded
    <UserStateContext.Provider value={{ userState, setUserState }}>
      <ProfileBar user_email={userState ? userState["Email"] : null} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        {userState ? null : (
          <Fragment>
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route
              path="/sign-in"
              element={<LoginPage setEnableAssignPage={setEnableAssignPage} />}
            />
            {enableAssignPage ? (
              <Route path="/assign-info" element={<AssignPage />} />
            ) : null}
          </Fragment>
        )}
      </Routes>
    </UserStateContext.Provider>
  );
}

export { UserStateContext };
export default App;
