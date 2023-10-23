import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useGoogleLogin } from "@react-oauth/google";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { TokenDecodeGOOGLE, login_api } from "../../services/Api";
import { useContext } from "react";
import { UserStateContext } from "../../App";
import Swal from "`sweetalert2`";

function LoginPage() {
  const { userState, setUserState } = useContext(UserStateContext);
  // const [tokenOfUser, setTokenOfUser] = useState(null); // useEffective when google login for local
  const [input, setInput] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();

  // const decodedToken = jwt_decode(authToken);
  const onSubmit = async (e, data_form) => {
    // req login api call
    // if success
    // api will sent cookie and respose  -> decode cookie -> set user state
    // else
    // alert("wrong password");
    e.preventDefault();
    try {
      // api will sent cookie and respose
      const response = await login_api(data_form);
      console.log(response);
      if (response.status === 201) {
        const data_user = response.data.user;
        console.log(data_user);
        // setUserState(data_user);
        navigate("/");
        window.location.reload();
      }
      if (
        response.status === 400 &&
        response.data.message === "Password is wrong"
      ) {
        Swal.fire({
          icon: "warning",
          title: "Password is wrong",
          text: "Please check mail and password again",
          confirmButtonColor: "#7fcee2",
        });
        console.log("wrong password");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (tokenOfUser) {
  //       try {
  //         const userInfo_decode = await TokenDecodeGOOGLE(
  //           tokenOfUser.access_token
  //         );
  //         // setUserInfo(data);
  //         setUserInfo(userInfo_decode);
  //         // const log = await Login_api_google(json_);
  //         // // 401 : mail not use / 200 : mail used
  //         // console.log("log : ", log.status);
  //         // if (log.status === 401) {
  //         //   setIsLogin(true);
  //         //   console.log(
  //         //     "Create new user and redirect to /assign info user page (./setpassword)"
  //         //   );
  //         //   // navigate("/setpassword");

  //         //   // window.location.href = "/register";
  //         // }
  //         // if (log.status === 201) {
  //         //   console.log("Login success and redirect to main page (./)");
  //         //   window.location.reload();
  //         // }

  //         // console.log(log);
  //       } catch (error) {
  //         console.log(error);

  //         // Handle the error as needed
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      // setTokenOfUser(codeResponse);
      // setIsLogin(true);
      localStorage.setItem("accessToken", codeResponse.access_token);
      // window.location.reload();
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleChange = (e) => {
    const { target } = e; //  target = e.target is thing that changed state
    const { name } = target; // name = e.target.name
    const value = e.target.value;
    setInput({ ...input, [name]: value });
    // console.log(formInput);
  };

  return (
    <div className="container_auth">
      <div>
        <div className="form-container_auth " id="login-form">
          <div id="auth_topic">Sign In</div>
          <img
            id="img_auth"
            src="../../image/login_img.png"
            alt="Italian Trulli"
          />
          {/* <button id="button_auth" type="submit" onClick={test}>
            Cookies
          </button> */}
          <form
            id="form_auth"
            onSubmit={(e) => {
              onSubmit(e, input);
            }}
          >
            <label id="label_auth">Email</label>
            <input
              className="input_auth"
              type="text"
              id="Email"
              name="Email"
              onChange={handleChange}
              // value={input.username}
              required
            />
            <label id="label_auth">Password</label>
            <input
              className="input_auth"
              type="password"
              id="password"
              name="Password"
              onChange={handleChange}
              // valก={input.password}
              required
            />
            <button id="button_auth" type="submit">
              Login
            </button>
          </form>

          <Divider
            style={{ color: "gray", fontSize: "0.8rem", margin: "1rem" }}
          >
            OR
          </Divider>

          {/* google login */}
          {false ? null : (
            <div id="container_auth_button">
              <div className="g-signin-button" onClick={loginGoogle}>
                <div className="g-icon">
                  <img src="../../image/google_icon.png" alt="Google Icon" />
                </div>
                <span className="g-text"></span>
              </div>
            </div>
          )}

          <div
            id="auth-box-link "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span id="text_auth">Don't have an account? </span>
          </div>
          <div
            id="auth-box-link "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span href="/register" id="signup-link">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
