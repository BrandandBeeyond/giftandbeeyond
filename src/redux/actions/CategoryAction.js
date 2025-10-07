import axios from "axios";
import {
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

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    const { data } = await axios.get("/api/categories");

    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching categories:", error);
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
  }
};

export const fetchSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });

    const { data } = await axios.get("/api/subcategories");

    dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    dispatch({ type: FETCH_SUBCATEGORIES_FAILURE, payload: error.message });
  }
};

export const addSubCategory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUBCATEGORY_REQUEST });

    const { data } = await axios.post("/api/subcategories", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: CREATE_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    dispatch({ type: CREATE_SUBCATEGORY_FAILURE, payload: error.message });
  }
};
