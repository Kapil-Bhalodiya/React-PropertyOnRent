import React from "react";
import axios from 'axios';
const getEventApi = {
    getEventList: async() =>{
        return await axios.get("http://localhost:8078/events/get");
    }
}
export default getEventApi;