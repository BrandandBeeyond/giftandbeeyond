import {
  CREATE_KIT_FAILURE,
  CREATE_KIT_REQUEST,
  CREATE_KIT_SUCCESS,
  FETCH_KITS_FAILURE,
  FETCH_KITS_REQUEST,
  FETCH_KITS_SUCCESS,
} from "../constants/KitConstant";

const initialState = {
  kits: [],
  loading: false,
  error: null,
};

export const KitReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITS_REQUEST:
    case CREATE_KIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_KIT_SUCCESS:
      return {
        ...state,
        loading: false,
        kits: action.payload,
      };
    case FETCH_KITS_SUCCESS:
      return {
        ...state,
        loading: false,
        kits: action.payload,
      };

    case FETCH_KITS_FAILURE:
    case CREATE_KIT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
