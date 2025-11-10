import axios from "axios";
import {
  CREATE_COUPON_FAILURE,
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
  FETCH_COUPONS_FAILURE,
  FETCH_COUPONS_REQUEST,
  FETCH_COUPONS_SUCCESS,
} from "../constants/CouponConstant";

export const CreateCouponCode = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COUPON_REQUEST });

    const { data } = await axios.post("/api/coupons", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: CREATE_COUPON_SUCCESS, payload: data.coupon });
    console.log("coupon added", data.coupon);
  } catch (error) {
    dispatch({
      type: CREATE_COUPON_FAILURE,
      payload: error.response?.data?.message || "Failed to create coupon",
    });
  }
};

export const fetchCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COUPONS_REQUEST });

    const { data } = await axios.get("/api/coupons");
    dispatch({ type: FETCH_COUPONS_SUCCESS, payload: data });

    console.log("the data coming to frontend data",data);

    
  } catch (error) {
    dispatch({
      type: FETCH_COUPONS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch coupons",
    });
  }
};
