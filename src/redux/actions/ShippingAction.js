import axios from "axios";
import {
  CREATE_SHIPPING_INFO_FAILURE,
  CREATE_SHIPPING_INFO_REQUEST,
  CREATE_SHIPPING_INFO_SUCCESS,
  GET_SHIPPING_INFO_FAILURE,
  GET_SHIPPING_INFO_REQUEST,
  GET_SHIPPING_INFO_SUCCESS,
} from "../constants/ShippingContant";

export const addShippingInfo = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SHIPPING_INFO_REQUEST });

    const { data } = await axios.post("/api/shippingInfo", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: CREATE_SHIPPING_INFO_SUCCESS,
      payload: data.shippingInfo,
    });
  } catch (error) {
    console.error("Error creating shipping info:", error);
    dispatch({ type: CREATE_SHIPPING_INFO_FAILURE, payload: error.message });
  }
};

export const getShippingInfo = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIPPING_INFO_REQUEST });

    const { data } = await axios.get(`/api/shippingInfo/${userId}`);

    dispatch({ type: GET_SHIPPING_INFO_SUCCESS, payload: data });

    console.log("shipping info from action", data);
  } catch (error) {
    dispatch({
      type: GET_SHIPPING_INFO_FAILURE,
      payload: error.message,
    });
  }
};
