import React from "react";
import axios from 'axios';

const getPropertyApi = {

    async getAllProperty() {
        return await axios.get('http://localhost:8080/')
    },
    async getAmenities() {
        return await axios.get('http://localhost:8078/subamenities/get')
    }
}
export default getPropertyApi;