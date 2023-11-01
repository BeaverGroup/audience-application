import React, {
  Fragment,
  createContext,
  useEffect,
  useState,
  Navigate,
} from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import ProfileBar from "./components/NavAuthDemo";
import LoginPage from "./pages/auth/LoginPage";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/main/MainPageDemo";
import RegisterPage from "./pages/auth/RegisterPage";
import AssignPage from "./pages/auth/AssignPage";

const UserStateContext = createContext();

function App() {
  const [userState, setUserState] = useState(null); // login?
  const [enableAssignPage, setEnableAssignPage] = useState(false); // login?
  console.log(userState);
  useEffect(() => {
    try {
      const authToken = Cookies.get("authToken");
      // console.log("authToken", authToken);
      if (!authToken) {
        console.log("Cookie_token not found");
        const g_token = localStorage.getItem("accessToken");
        if (g_token) {
          localStorage.removeItem("accessToken");
        }
      } else {
        // use api login user by sent mail and google token for verify
        const authToken = Cookies.get("authToken");
        const decodedToken = jwt_decode(authToken);

        if (decodedToken) {
          // console.log("DecodedToken : ", decodedToken);
          setUserState(decodedToken);

          // window.location.reload();
        } else {
          // console.log("DecodedToken : ", decodedToken);
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
