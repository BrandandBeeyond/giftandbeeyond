import {
  FETCH_COLOR_FAILURE,
  FETCH_COLOR_REQUEST,
  FETCH_COLOR_SUCCESS,
} from "../constants/ProductConstant";

const initialState = {
  colors: [],
  loading: false,
  error: null,
};

export const ColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_COLOR_SUCCESS:
      return {
        ...state,
        loading: false,
        colors: action.payload,
      };

    case FETCH_COLOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
