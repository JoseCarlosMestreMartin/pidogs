import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DETAIL, CLEAR_DETAIL } from "./types";

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
      case GET_DETAIL:
        return {
          ...state,
          details: action.payload,
        };

      case CLEAR_DETAIL:
        return {
          ...state,
          details: [],
        }
    default:
      return state;
  }
}
