import axios from "axios";
import {
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from "../constants/PaymentConstants";

export const createPaymentRequest = (amount, user) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_REQUEST });

    const { data } = await axios.post("/api/payments/create-order", { amount });

    const order = data.order;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Gift & Beeyond",
      description: "Test Transaction",
      order_id: order.id,
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      handler: async function (response) {
        const { data } = await axios.post("/api/payments/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (data.success) {
          dispatch({
            type: PAYMENT_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: PAYMENT_FAILURE,
            payload: data.message,
          });
        }
      },
      theme: {
        color: "#5a2e0c",
      },
      method:{
        netbanking:true,
        upi:true,
        card:true,
        wallet:true,
        emi:true
      }
    };

    const rzor = new window.Razorpay(options);
    rzor.open();
  } catch (error) {
    dispatch({ type: "PAYMENT_FAIL", payload: error.message });
  }
};
