import axios from "axios";
import {
  CREATE_SHIPPING_INFO_FAILURE,
  CREATE_SHIPPING_INFO_REQUEST,
  CREATE_SHIPPING_INFO_SUCCESS,
} from "../constants/ShippingContant";

export const addShippingInfo = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SHIPPING_INFO_REQUEST });

    const { data } = await axios.post("/api/shippinginfo", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: CREATE_SHIPPING_INFO_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error creating shipping info:", error);
    dispatch({ type: CREATE_SHIPPING_INFO_FAILURE, payload: error.message });
  }
};
