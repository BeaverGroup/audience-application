import axios from "axios";
// require("dotenv").config(); // Load environment variables from .env file

const port = import.meta.env.VITE_API_PORT;
const host_ip = import.meta.env.VITE_API_HOST_IP;

export const TokenDecodeGOOGLE = async (token) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          // value: "same-origin", // "same-origin-allow-popups"
        },
      }
    );
    // Check for a successful response (status code 200)
    if (response.status === 200) {
      // console.log(response);
      return response;
    } else {
      if (response.status === 401) {
        console.log("Token expired or Token not found or Token invalid");
      } else {
        // Handle unexpected response status codes
        console.error("Unexpected response status:", response.status);
      }
      return null;
    }
    // return response;
  } catch (e) {
    console.log(e);
    console.log("Failed to decode token");
    return null;
  }
};

// export const login_api = async (data) => {};
// // click on login google -> gogole sent token to font
// // -> font call this api -> by sent user id password

export const login_api = async (data) => {
  console.log(data);
  const baseURL = `http://${host_ip}:${port}/auth/login`;

  if (!data) {
    console.log("Missing required field(s)");
    return false;
  }
  var data_format = JSON.stringify(data);

  try {
    const response = await axios.post(baseURL, data_format, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("status", response.status);

    if (response.status === 201) {
      console.log("login_api : Success");
      return response;
    } else {
      // console.log("status code : " + response.statusCode);
      // console.log("Error : " + response.error);
      console.log("Response: " + response);
    }

    // console.log("status", response.status);
  } catch (e) {
    console.log("Error axios fail : ", e);

    // console.log("Error respose : ", e.response);
  }
};

export const CreateAuthUser = async (userData) => {
  const { Name, Gender, Age, Nationality, Password, Email } = userData;

  if (!Email || !Password || !Name || !Gender || !Age || !Nationality) {
    // Role
    console.error("Missing required field(s)");
    return { success: false, message: "Missing required field(s)" };
  }

  try {
    // Send the POST request
    const BASE_URL = `http://${host_ip}:${port}/auth/register`;

    const response = await axios.post(BASE_URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    // Check the response status
    if (response.status === 201) {
      return { success: true, data: response.data };
    } else if (response.status === 400) {
      console.error("Bad Request:", response.data);
      return { success: false, message: "Bad request", data: response.data };
    } else {
      console.error("Unhandled response status:", response.status);
      return {
        success: false,
        message: `Unhandled response status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("Failed to submit data", error);
    return {
      success: false,
      message: "Error occurred while making the request",
      error,
    };
  }
};
