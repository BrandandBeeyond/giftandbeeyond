import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILURE,
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
} from "../constants/CategoryConstant";

const initialState = {
  categories: [],
  subcategories: [],
  loading: false,
  error: null,
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBCATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case FETCH_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
