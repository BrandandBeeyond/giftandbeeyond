import {
  CREATE_SHIPPING_INFO_FAILURE,
  CREATE_SHIPPING_INFO_REQUEST,
  CREATE_SHIPPING_INFO_SUCCESS,
  GET_SHIPPING_INFO_FAILURE,
  GET_SHIPPING_INFO_REQUEST,
  GET_SHIPPING_INFO_SUCCESS,
} from "../constants/ShippingContant";

const initialState = {
  shippingInfo: {
    addresses: [],
  },
  loading: false,
  error: null,
};

export const ShippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHIPPING_INFO_REQUEST:
    case GET_SHIPPING_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CREATE_SHIPPING_INFO_SUCCESS:
    case GET_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingInfo: action.payload,
      };

    case CREATE_SHIPPING_INFO_FAILURE:
    case GET_SHIPPING_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
