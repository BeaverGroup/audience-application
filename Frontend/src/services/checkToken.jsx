import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const checkToken = (setUserState) => {
    try {
        const authToken = Cookies.get("authToken");
        // console.log("authToken", authToken);
        if (!authToken) {
          // console.log("Cookie_token not found");
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
            // console.log("Token expired or Token not found or Token invalid");
            Cookies.remove("authToken");
            // window.location.reload();
          }
        }
      } catch (e) {
        // console.log(e);
        Cookies.remove("authToken");
      }
}   

export default checkToken