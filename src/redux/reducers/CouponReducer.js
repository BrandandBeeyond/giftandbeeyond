import {
  CREATE_COUPON_FAILURE,
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
  FETCH_COUPONS_FAILURE,
  FETCH_COUPONS_REQUEST,
  FETCH_COUPONS_SUCCESS,
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
    case FETCH_COUPONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        couponCreated: false,
      };

    case FETCH_COUPONS_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: Array.isArray(action.payload) ? action.payload : [],
      };

    case CREATE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: Array.isArray(action.payload)
          ? action.payload
          : [...state.coupons, action.payload],
        couponCreated: true,
      };

    case CREATE_COUPON_FAILURE:
    case FETCH_COUPONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        couponCreated: false,
      };

    default:
      return state;
  }
};
