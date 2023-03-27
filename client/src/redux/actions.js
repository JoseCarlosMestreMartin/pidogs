import axios from "axios";
import { GET_ALL_DOGS }
    from "./types";

    const urlMyApi = "http://localhost:3001";
export function getAllDogs(){
    return async function(dispatch){
        var aux = await axios.get(`${urlMyApi}/dogs`);
        console.log("GET_ALL_DOGS: ", aux.data);
        return dispatch({
            type: GET_ALL_DOGS,
            payload: aux.data,
        });
    };

};