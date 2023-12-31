import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./assign-page.css";
import Swal from "`sweetalert2`";
import { CreateAuthUser } from "../../services/Api";
import { useLocation } from "react-router-dom";
import countryList from 'react-select-country-list'
import axios from "axios";

function AssignPage() {
  const options = useMemo(() => countryList().getData(), [])

  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;
  const [input, setInput] = useState({
    Email: email,
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
    // console.log(input);
  };
  const getValue = () => {
    const value = document.getElementById("select1").value;
    const name = document.getElementById("select1").name;
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  const getValueCountry = () => {
    const value = document.getElementById("select2").value;
    const name = document.getElementById("select2").name;
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

  const userNationality = async (nationality) => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    try {
      const countNationality = await axios.post(`http://${host_ip}:${port}/country/add/${nationality}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(countNationality);
      const sending = JSON.stringify({
        country: countNationality.data.country,
        count: countNationality.data.count
      })
      // console.log(sending);
      const UserDataForIoc = await axios.post("http://nongnop.azurewebsites.net/user_statistic/", sending, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      // console.log(UserDataForIoc);
    } catch (e) {
      // console.log(e);
    }
  }

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
      // console.log(new_user);

      // If the user was successfully created, navigate to the home page
      if (new_user) {
        if (new_user.success) {
          userNationality(new_user.data.user.Nationality)
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
          <div id="reset_password_topic">Assign Infomation </div>
          <div id="assign_topic"> Assign </div>
          <form id="form_auth" onSubmit={onSubmit}>
            <label id="label_setInfo">Email</label>
            <input
              className="input_set_password"
              type="email"
              id="Mail"
              name="Mail"
              disabled
              value={input.Email}
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
            <div className="flex-row width-set">
              <div className="flex-column margin-right">
                <label id="label_setInfo">Gender</label>
                <select className="drop-down" onChange={getValue} name="Gender" id="select1">
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex-column">
                <label id="label_setInfo">Age</label>
                <input
                  className="input_set_info_100"
                  type="number"
                  min="1"
                  id="Age"
                  name="Age"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <label id="label_setInfo">Nationality</label>
            <select className="drop-down-96" onChange={getValueCountry} name="Nationality" id="select2">
              <option value=""></option>
              {options.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
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
              id="Confirm-Password"
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
export default AssignPage;
