import axios from "axios"

const Base_URL = import.meta.env.MODE === "production" ? "/" : "http://localhost:5001/api"
const api=axios.create({
    baseURL : Base_URL
})

export default api 