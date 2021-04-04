import instance from "./instance";
import decode from "jwt-decode";
import Cookies from "js-cookie";
import * as types from "../types";
import { addUser } from "./tripActions";

const setUser = (token) => {
  Cookies.set("token", token);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  return {
    type: types.SET_USER,
    payload: decode(token),
  };
};

export const signin = (userData, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signin", userData);
      await dispatch(setUser(res.data.token));
      await dispatch(addUser());
      //       dispatch(setUser(res.data.token));
      //       if (JSON.parse(localStorage.getItem("activeTrip"))) {
      //         assignTrip(JSON.parse(localStorage.getItem("activeTrip")).id);
      //       }
      history.replace("/");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
};

export const signup = (newUser, history) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signup", newUser);
      await dispatch(setUser(res.data.token));
      await dispatch(addUser());
      //       dispatch(setUser(res.data.token));
      //       if (JSON.parse(localStorage.getItem("activeTrip"))) {
      //         assignTrip(JSON.parse(localStorage.getItem("activeTrip")).id);
      //       }
      history.replace("/");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
};

export const signout = () => {
  console.log("SIGNOUT");
  Cookies.remove("token");
  delete instance.defaults.headers.common.Authorization;
  return {
    type: types.SET_USER,
    payload: null,
  };
};

export const checkForToken = () => (dispatch) => {
  const token = Cookies.get("token");
  if (token) {
    const user = decode(token);
    const currentTime = Date.now();
    if (currentTime < user.exp) {
      dispatch(setUser(token));
    } else {
      dispatch(signout());
    }
  }
};

export const fetchHistory = () => async (dispatch) => {
  try {
    const res = await instance.get("/trips");
    dispatch({ type: types.FETCH_HISTORY, payload: res.data });
  } catch (error) {
    console.log("Error: ", error);
  }
};
export const fetchReviews = () => async (dispatch) => {
  try {
    const res = await instance.get("/reviews");
    dispatch({ type: types.FETH_REVIEWS, payload: res.data });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteTrip = (tripId, history) => async (dispatch) => {
  try {
    await instance.delete(`/trips/${tripId}`);
    history.replace("/history");
    dispatch({
      type: types.DELETE_TRIP,
      payload: tripId,
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

export const deleteReview = (reviewId, history) => async (dispatch) => {
  try {
    await instance.delete(`/reviews/${reviewId}`);
    // history.replace("/profile");
    dispatch({
      type: types.DELETE_REVIEW,
      payload: reviewId,
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

const assignTrip = async (tripId) => {
  const res = await instance.put(`/trips/${tripId}`);
  localStorage.setItem("activeTrip", JSON.stringify(res.data));
};
