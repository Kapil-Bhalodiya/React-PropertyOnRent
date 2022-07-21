import React from "react";
import axios from 'axios';

const getPropertyApi = {
        getPropertyTypeList: async() =>{
            return await axios.get("http://localhost:8078/propertytype/get");
        },

        getStateList: async() =>{
            return await axios.get("http://localhost:8078/state/get");
        },

        getCityList: async(stateid) =>{
            return await axios.get("http://localhost:8078/city/getcitystatewise/"+stateid);
        },

        getPropertyList: async(propertytypeid,cityid) =>{
            return await axios.get("http://localhost:8074/property/getproperty/"+propertytypeid+"/"+cityid);
        }
}
export default getPropertyApi;