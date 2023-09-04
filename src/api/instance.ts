import axios from "axios"

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "api-key" : "96621b9e-66da-4457-bd2c-0cd5eeae0e5a"
    }
})