import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handlePlans = async (planType) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { planType },
      { withCredentials: true }
    );

    // Now we have created order so made api call so we need to open the popup window for the payment details
    // refer documentation

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "CodeMate.Online",
      description: "Connect to premimum features",
      order_id: orderId, // This is the order_id created in the backend
      callback_url: "http://localhost:3000/payment-success", // Your success URL
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <div className="p-8 bg-base-100">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-8">
            Choose Your Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Silver Plan */}
            <div className="card border-2 bg-base-100 p-6 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-white-200">
                Silver Plan
              </h3>
              <p className="text-white-200 mt-2">
                For developers who are just starting to connect.
              </p>
              <div className="text-4xl font-bold text-white-200 mt-4">
                $9.99/month
              </div>

              <ul className="list-disc mt-4 text-left px-6">
                <li>Access to basic matching features</li>
                <li>1 active match per week</li>
                <li>Basic profile visibility</li>
              </ul>

              <button
                className="btn btn-primary mt-6 w-full"
                onClick={() => handlePlans("silver")}
              >
                Choose Silver Plan
              </button>
            </div>

            {/* Gold Plan */}
            <div className="card border-2 border-gray-200 p-6 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-white-200">
                Gold Plan
              </h3>
              <p className="text-white-600 mt-2">
                For developers who want more visibility and connections.
              </p>
              <div className="text-4xl font-bold text-white-200 mt-4">
                $19.99/month
              </div>

              <ul className="list-disc mt-4 text-left px-6">
                <li>Unlimited matches</li>
                <li>Priority profile visibility</li>
                <li>Advanced filtering options</li>
              </ul>

              <button
                className="btn btn-warning mt-6 w-full"
                onClick={() => handlePlans("gold")}
              >
                Choose Gold Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
