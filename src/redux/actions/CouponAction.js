import axios from "axios";
import {
  CREATE_COUPON_FAILURE,
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
} from "../constants/CouponConstant";

export const CreateCouponCode = (couponData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COUPON_REQUEST });

    const { data } = await axios.post("/api/coupons", couponData);

    dispatch({ type: CREATE_COUPON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_COUPON_FAILURE,
      payload: error.response?.data?.message || "Failed to create coupon",
    });
  }
};
