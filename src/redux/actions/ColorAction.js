import axios from "axios";
import {
  FETCH_COLOR_FAILURE,
  FETCH_COLOR_REQUEST,
  FETCH_COLOR_SUCCESS,
} from "../constants/ProductConstant";

export const fetchColors = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COLOR_REQUEST });

    const { data } = await axios.get("/api/colors");

    dispatch({ type: FETCH_COLOR_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching colors:", error);
    dispatch({ type: FETCH_COLOR_FAILURE, payload: error.message });
  }
};
