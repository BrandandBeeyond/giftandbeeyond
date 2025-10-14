import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_VERIFY_OTP_FAILURE,
  USER_VERIFY_OTP_REQUEST,
  USER_VERIFY_OTP_SUCCESS,
} from "../constants/UserConstant";

const initialState = {
  loading: false,
  otpLoading: false,
  user: null,
  error: null,
  success:null,
  isAuthenticated: false,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success:null,
      };

    case USER_VERIFY_OTP_REQUEST:
      return {
        ...state,
        otpLoading: true,
        error: null,
        success:null,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success:"Registration successful",
      };
    case USER_VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpLoading: false,
        user: action.payload,
        isAuthenticated: true,
        success:"OTP verified successfully",
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        success:"Login successful",
      };
    case USER_REGISTER_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case USER_VERIFY_OTP_FAILURE:
      return {
        ...state,
        otpLoading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
