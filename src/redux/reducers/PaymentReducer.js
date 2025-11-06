import {
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from "../constants/PaymentConstants";

const initialState = {
  paymentLoading: false,
  order: null,
  paymentSuccess: false,
  error: null,
};

export const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        paymentLoading: true,
        paymentSuccess: false,
        error: null,
      };

    case PAYMENT_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
        order: action.payload,
        paymentSuccess: true,
      };

    case PAYMENT_FAILURE:
      return {
        ...state,
        paymentLoading: false,
        error: action.payload,
        paymentSuccess: false,
      };

    default:
      return state;
  }
};
