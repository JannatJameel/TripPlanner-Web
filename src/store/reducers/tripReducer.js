import * as types from "../types";

const initialState = {
  trip: {},
  activities: [],
  itinerary: [],
  directions: {},
  shardeTrip: {},
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TRIP:
      return {
        ...state,
        trip: action.payload,
      };
    case types.SET_TRIP_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case types.SET_ITINERARY:
      return {
        ...state,
        itinerary: action.payload,
      };
    case types.HANDLE_ACTIVITY:
      const remove = state.activities.includes(action.payload);

      const activities = remove
        ? state.activities.filter((activity) => activity !== action.payload)
        : [...state.activities, action.payload];

      localStorage.setItem("myActivities", JSON.stringify(activities));
      return {
        ...state,
        activities,
      };
    case types.SET_DIRECTIONS:
      localStorage.setItem("directions", JSON.stringify(action.payload));
      return {
        ...state,
        directions: action.payload,
      };
    case types.SET_SHARED:
      return {
        ...state,
        shardeTrip: action.payload,
      };
    default:
      return state;
  }
};

export default tripReducer;
