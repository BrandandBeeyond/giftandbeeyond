import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAILURE,
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_SUCCESS,
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
    case CREATE_CATEGORY_REQUEST:
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

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case FETCH_CATEGORIES_FAILURE:
    case CREATE_CATEGORY_FAILURE:
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
    case CREATE_SUBCATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: action.payload,
      };

    case CREATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: action.payload,
      };
    case FETCH_SUBCATEGORIES_FAILURE:
    case CREATE_SUBCATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
