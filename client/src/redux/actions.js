import axios from "axios";
import { GET_ALL_DOGS, GET_DETAIL, FILTER_BY_NAME } from "./types";


const urlMyApi = "http://localhost:3001";
export function getAllDogs() {
  return async function (dispatch) {
    var aux = await axios.get(`${urlMyApi}/dogs`);
    return dispatch({
      type: GET_ALL_DOGS,
      payload: aux.data,
    });
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    var aux = await axios.get(`${urlMyApi}/dogs/${id}`);
    console.log("GET_DETAIL: ", aux.data);
    return dispatch({
      type: GET_DETAIL,
      payload: aux.data,
    });
  };
}

export function clearDetail() {
  return {
    type: GET_DETAIL,
    payload: [],
  };
}

export function filterByName(name) {
  console.log("dentro de filterByName");
  console.log("name: ", name);
  return {
    type: FILTER_BY_NAME,
    payload: name,
  }
}

export const postDog = (newDog) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`localhost:3001/dogs`, newDog);
            return res;
        } catch (error) {
            return dispatch ({
                type: ERROR,
            })
        }
    };
};
