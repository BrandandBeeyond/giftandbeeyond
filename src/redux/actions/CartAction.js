import {
  ADD_TO_CART,
  CART_ERROR,
  INCREMENT_QUANTITY,
} from "../constants/CartConstant";

export const Addtocart = (product) => async (dispatch, getState) => {
  try {
    const { cart } = getState().cart;

    const exisitingItem = cart.find((item) => item._id === product._id);

    if (exisitingItem) {
      dispatch({
        type: INCREMENT_QUANTITY,
        payload: product._id,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        payload: { ...product, quantity: 1, addedAt: Date.now() },
      });
    }
  } catch (error) {
    console.error("failed to add in cart", error);
    dispatch({ type: CART_ERROR });
  }
};
