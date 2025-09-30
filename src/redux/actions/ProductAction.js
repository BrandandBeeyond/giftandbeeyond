import axios from "axios";
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from "../constants/ProductConstant";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/products"); 

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });

   
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

