import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordSetPage.css";
import Swal from "`sweetalert2`";
import { CreateAuthUser } from "../../services/Api";
function RegisterPage() {
  const navigate = useNavigate();
  // (tokenOfUser && token_g)
  //   useEffect(() => {
  //     if (!userInfo && token_g) {
  //       localStorage.removeItem("accessToken");
  //       navigate("/");
  //     } else {
  //       setInput({ ...input, Mail: userInfo.data.email, Token: token_g });
  //     }
  //   }, [userInfo]);

  const [input, setInput] = useState({
    Email: "",
    Name: "",
    Gender: "",
    Age: "",
    Nationality: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Initially assume passwords match

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  const checkPasswordDuplicate = () => {
    const { Password, ConfirmPassword } = input;

    if (Password === ConfirmPassword) {
      return true;
    } else {
      // Passwords do not match
      Swal.fire({
        icon: "warning",
        title: "Try again",
        text: "Passwords do not match",
        confirmButtonColor: "#7fcee2",
      });
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if the passwords match
    if (!checkPasswordDuplicate()) {
      console.error("Passwords do not match");
      setPasswordsMatch(false);
      return; // If they don't match, exit early to avoid further execution
    }

    try {
      // Create a new user
      const new_user = await CreateAuthUser({ ...input, Role: "user" });
      console.log(new_user);

      // If the user was successfully created, navigate to the home page
      if (new_user) {
        if (new_user.success) {
          navigate("/");
          window.location.reload();
        }

        if (!new_user.success && new_user.message == "Email is already used") {
          Swal.fire({
            icon: "warning",
            title: "Try again",
            text: "Email is already used",
            confirmButtonColor: "#7fcee2",
          });
        }
      } else {
        console.error("User creation failed:", new_user);
      }
    } catch (err) {
      // Log any errors that occur during user creation
      console.error("Error during user creation:", err);
    }
  };

  return (
    <div className="container_auth">
      <div>
        <div className="form_set_pass" id="login-form">
          <div id="reset_password_topic">Sign Up </div>
          <img id="img_auth" src="../../image/setPass_img.jpeg" />
          <form id="form_auth" onSubmit={onSubmit}>
            <label id="label_setInfo">Email</label>
            <input
              className="input_set_password"
              type="text"
              id="Email"
              onChange={handleChange}
              name="Email"
              required
            />
            <label id="label_setInfo">Name</label>
            <input
              className="input_set_password"
              type="text"
              id="Name"
              name="Name"
              onChange={handleChange}
              required
            />{" "}
            <label id="label_setInfo">Gender</label>
            <input
              className="input_set_password"
              type="text"
              id="Gender"
              name="Gender"
              onChange={handleChange}
              required
            />
            <label id="label_setInfo">Age</label>
            <input
              className="input_set_password"
              type="text"
              id="Age"
              name="Age"
              onChange={handleChange}
              required
            />
            <label id="label_setInfo">Nationality</label>
            <input
              className="input_set_password"
              type="text"
              id="Nationality"
              name="Nationality"
              onChange={handleChange}
              required
            />
            <label id="label_setInfo">Password</label>
            <input
              className={
                passwordsMatch ? "input_set_password" : "input_warning"
              }
              type="password"
              id="Password"
              name="Password"
              onChange={handleChange}
              required
            />
            <label id="label_setInfo">Confirm Password</label>
            <input
              className={
                passwordsMatch ? "input_set_password" : "input_warning"
              }
              type="password"
              id="Confirm Password"
              name="ConfirmPassword"
              onChange={handleChange}
              required
            />
            <button id="button_setPassword" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
