import {
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  GET_DETAIL,
  CLEAR_DETAIL,
  FILTER_BY_NAME,
  POST_DOG,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_CREATED,
} from "./types";

const intialState = {
  allDogs: [],
  temperaments: [],
  dogs: [],
  details: [],
  // flagFilterByName: false,
  // filterByName: "",
  // flagFilterByTemperament: false,
  // textFilterByTemperament: "",
  // flagFilterIsCreated: false,
  // filterIsCreated: false,
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
      };
    case FILTER_BY_NAME:
      return {
        ...state,
        dogs: state.allDogs.filter((e) => {
          return e.name.includes(action.payload);
        }),
      };
    case POST_DOG:
      return {
        ...state,
        allDogs: state.allDogs.push(action.payload),
        dogs: state.allDogs,
      };
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        dogs: state.allDogs.filter((e) => {
          return e.temperament?e.temperament.includes(action.payload):false;
        }),
      };
      case FILTER_BY_CREATED:
        return {
          ...state,
          dogs: state.allDogs.filter((e) => {
          console.log("e.isCreated",e.isCreated);
          return e.isCreated?e.isCreated:false;
          }),
        
        };

    default:
      return state;
  }
}
