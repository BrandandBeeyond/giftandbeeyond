import {
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from "../constants/PaymentConstants";

const initialState = {
  loading: false,
  order: null,
  paymentSuccess: false,
  error: null,
};

export const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        paymentSuccess: false,
      };

    case PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        paymentSuccess: true,
      };

    case PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentSuccess: false,
      };

    default:
      return state;
  }
};
