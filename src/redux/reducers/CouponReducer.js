import {
  CREATE_COUPON_FAILURE,
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
} from "../constants/CouponConstant";

const initialState = {
  loading: false,
  error: null,
  couponCreated: false,
  coupons: [],
};

export const CouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        couponCreated: false,
      };

    case CREATE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: action.payload,
        couponCreated: true,
      };

    case CREATE_COUPON_FAILURE:
      return {
        ...state,
        error: action.payload,
        couponCreated: false,
      };

    default:
      return state;
  }
};
