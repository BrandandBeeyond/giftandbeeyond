import axios from "axios";
import {
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

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post("/api/users/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    return { type: USER_REGISTER_SUCCESS,payload: data};
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post("/api/users/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyOtp = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_OTP_REQUEST });

    const { data } = await axios.post("/api/users/verify-otp", { email, otp });

    dispatch({ type: USER_VERIFY_OTP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_VERIFY_OTP_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
