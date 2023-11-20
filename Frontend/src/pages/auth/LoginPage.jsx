import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useGoogleLogin } from "@react-oauth/google";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import {
  Login_api_google,
  TokenDecodeGOOGLE,
  login_api,
} from "../../services/Api";
import Swal from "`sweetalert2`";

function LoginPage({ setEnableAssignPage }) {
  const [googleTokenOfUser, setGoolgeTokenOfUser] = useState(null); // useEffective when google login for local
  const [input, setInput] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGoogleUserData() {
      // console.log(googleTokenOfUser);
      if (googleTokenOfUser) {
        const response = await TokenDecodeGOOGLE(googleTokenOfUser);
        // console.log("response", response);
        if (response) {
          const user_data = response.data;
          // console.log(user_data);
          try {
            const data_body = {
              Email: user_data.email,
              Token: googleTokenOfUser,
            };
            const response_google_login = await Login_api_google(data_body);
            if (response_google_login.status === 201) {
              // this email has db
              const data_user = response_google_login.data.user;
              // console.log(data_user);
              navigate("/");
              window.location.reload();
            } else if (
              response_google_login.status === 409 &&
              response_google_login.data.message == "Email not used"
            ) {
              // console.log("Google Login Error");
              //redirect set info page with  prop of email
              setEnableAssignPage(true);
              navigate("/assign-info", { state: { email: user_data.email } });
            } else {
              // console.log("login fail");
              // console.log(response_google_login);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
    fetchGoogleUserData();
  }, [googleTokenOfUser]);

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setGoolgeTokenOfUser(codeResponse.access_token);
      // setIsLogin(true);
      // console.log("codeResponse", codeResponse);
      localStorage.setItem("accessToken", codeResponse.access_token);
      // window.location.reload();
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
    // console.log(formInput);
  };

  const onSubmit = async (e, data_form) => {
    e.preventDefault();
    try {
      // api will sent cookie and respose
      const response = await login_api(data_form);
      // console.log(response);
      if (response.status === 201) {
        const data_user = response.data.user;
        // console.log(data_user);
        navigate("/");
        window.location.reload();
      }
      // console.log(response.status, response.data.message);
      if (
        (response.status === 400 &&
          response.data.message === "Password is wrong") ||
        "Email is not found"
      ) {
        Swal.fire({
          icon: "warning",
          title: "Password or Email is wrong",
          text: "Please check mail and password again",
          confirmButtonColor: "#7fcee2",
        });
        // console.log("wrong password");
      }
    } catch (e) {
      console.log(e);
    }
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
              required
            />
            <label id="label_auth">Password</label>
            <input
              className="input_auth"
              type="password"
              id="password"
              name="Password"
              onChange={handleChange}
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
            <span href="/sign-up" id="signup-link">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
