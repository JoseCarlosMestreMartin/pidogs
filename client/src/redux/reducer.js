import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS } from "./types";

const intialState = {
  allDogs: [],
  temperaments: [],
  dogs: [],
  details: [],
};

export default function rootReducer(state = intialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    default:
      return state;
  }
}
