import axios from "axios"

export async function sportData() {
    const ioc_api = import.meta.env.VITE_IOC_API
    const res = await axios.get(ioc_api)
    return res.data
}

