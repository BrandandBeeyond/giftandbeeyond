import axios from "axios";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from "../constants/OrderConstant";

export const CreateOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await axios.post("/api/orders/create", orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:
        error.response?.data?.message || "Failed to create order. Try again.",
    });
  }
};
