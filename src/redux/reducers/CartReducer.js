import {
  ADD_TO_CART,
  CART_LOADING,
  CLEAR_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "../constants/CartConstant";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ADD_TO_CART:
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          loading: false,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
          loading: false,
        };
      }

    case INCREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        loading: false,
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        loading: false,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
        loading: false,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        loading: false,
      };

    default:
      return state;
  }
};
