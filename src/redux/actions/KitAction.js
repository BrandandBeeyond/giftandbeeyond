import axios from "axios";
import {
  CREATE_KIT_FAILURE,
  CREATE_KIT_REQUEST,
  CREATE_KIT_SUCCESS,
  FETCH_KITS_FAILURE,
  FETCH_KITS_REQUEST,
  FETCH_KITS_SUCCESS,
} from "../constants/KitConstant";

export const createKit = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_KIT_REQUEST });

    const { data } = await axios.post("/api/kits", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: CREATE_KIT_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error creating kit:", error);
    dispatch({ type: CREATE_KIT_FAILURE, payload: error.message });
  }
};

export const fetchAllKits = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_KITS_REQUEST });

    const { data } = await axios.get("/api/kits");

    dispatch({ type: FETCH_KITS_SUCCESS, payload: data });
    console.log("data kits",data);
    
  } catch (error) {
    console.error("Error fetching kits:", error);
    dispatch({ type: FETCH_KITS_FAILURE, payload: error.message });
  }
};
