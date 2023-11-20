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
          // value: "same-origin-allow-popups",
        },
      }
    );
    // Check for a successful response (status code 200)
    if (response.status === 200) {
      // console.log(response);
      return response;
    } else {
      if (response.status === 401) {
        // console.log("Token expired or Token not found or Token invalid");
      } else {
        // Handle unexpected response status codes
        console.error("Unexpected response status:", response.status);
      }
      return null;
    }
    // return response;
  } catch (e) {
    console.log(e);
    // console.log("Failed to decode token");
    return null;
  }
};

// export const login_api = async (data) => {};
// // click on login google -> gogole sent token to font
// // -> font call this api -> by sent user id password

export const login_api = async (data) => {
  // console.log(data);
  const baseURL = `http://${host_ip}:${port}/auth/login`;

  if (!data) {
    // console.log("Missing required field(s)");
    return false;
  }
  var data_format = JSON.stringify(data);

  try {
    const response = await axios.post(baseURL, data_format, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // ยอมรับ status codes ระหว่าง 200-499
      },
    });
    // console.log("status", response.status);

    if (response.status === 201) {
      // console.log("login_api : Success");
      return response;
    } else {
      // console.log("status code : " + response.status);
      // console.log("Error : " + response.error);
      // console.log(response);
      return response;
    }

    // console.log("status", response.status);
  } catch (e) {
    // console.log("Error axios fail : ", e);

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
      validateStatus: function (status) {
        return status >= 200 && status < 500; // ยอมรับ status codes ระหว่าง 200-499
      },
    });

    // Check the response status
    if (response.status === 201) {
      return { success: true, data: response.data };
    } else if (
      response.status === 400 &&
      response.data.message === "Email is already used"
    ) {
      // console.log("Email is already used");
      return { success: false, message: "Email is already used" };
    } else if (response.status === 400) {
      // console.log("Bad Request: ", response.data);
      return { success: false, message: "Bad request" };
    } else {
      // console.log("Unhandled response status:", response.status);
      return false;
    }
  } catch (error) {
    // console.error("Failed to submit data", error);
    return {
      success: false,
      message: "Error occurred while making the request",
      error,
    };
  }
};

export const Login_api_google = async (data) => {
  const baseURL = `http://${host_ip}:${port}/auth/google-login`;
  if (!data) {
    // console.log("Missing required field(s)");
    return false;
  }
  var data_format = JSON.stringify(data);
  try {
    const response = await axios.post(baseURL, data_format, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // ยอมรับ status codes ระหว่าง 200-499
      },
    });

    // console.log("Response.status : ", response.status);
    if (response.status === 201) {
      return response; // Return just the data, but this is up to your needs
    } else if (
      response.status === 409 &&
      response.data.message === "Email not used"
    ) {
      // console.log("This email is not yet in db.");
      return response;
    } else {
      // สำหรับ status codes อื่น ๆ ที่ไม่ได้จัดการใน if และ else if ข้างต้น
      // console.log("Response with status:", response.status);
      return response;
    }
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      console.error("Request timed out");
    } else {
      // console.log("Error:", err);
    }
    return false;
  }
};

// export const Login_api_google = async (data) => {
//   const baseURL = `http://${host_ip}:${port}/auth/google-login`;

//   if (!data) {
//     console.error("Missing required field(s)");
//     return false;
//   }

//   const data_format = JSON.stringify(data);

//   try {
//     const response = await axios.post(baseURL, data_format, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//       validateStatus: (status) => status >= 200 && status < 500,
//     });
//     if (response) {
//       console.log("yiii");
//       // return response;
//     }
//   } catch (error) {
//     // console.error("Error:", err);
//     // return false;
//     if (error.code === "ECONNABORTED") {
//       console.log("Request timed out");
//     } else {
//       console.log(error.message);
//     }
//   }
// };
