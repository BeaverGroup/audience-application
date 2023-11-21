import axios from "axios";

export const getAllSubs = async (userState) => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    try {
      const userSub = await axios.get(`http://${host_ip}:${port}/user/userAllsub/${userState._id}`, {
        withCredentials: true,
      });
      return userSub.data
    } catch (e) {
      // console.log(e);
    }
  }


export const unSubscribe = async (userState ,sportName) => {
    const port = import.meta.env.VITE_API_PORT;
    const host_ip = import.meta.env.VITE_API_HOST_IP;
    const data_format = JSON.stringify({
      Sport: sportName
    })
    try {
      await axios.post(`http://${host_ip}:${port}/user/unsubscribe/${userState._id}`, data_format, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (e) {
      console.log(e.response.data.error);
    }
  }


