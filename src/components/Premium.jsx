import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const user = useSelector((store) => store.user);
  console.log(user);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

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
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open(); // for openning the popup
  };

  return isUserPremium ? (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r bg-base-200">
      <div className="text-center text-white border border-white p-8 rounded-xl shadow-2xl bg-opacity-90">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold mb-6 animate__animated animate__fadeIn">
          {user?.firstName}, You are a Premium Member!
        </h1>

        {/* Fancy Image with border and shadow */}
        <div className="mx-auto mb-6">
          <img
            src={user?.photoURL}
            alt="Premium Member"
            className="rounded-full w-52 h-52 mx-auto border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Subtitle with a nice icon */}
        <div className="text-xl mb-8 text-gray-200">
          <p className="flex justify-center items-center space-x-2">
            <svg
              className="w-6 h-6 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 17l4 4 4-4M12 3v14"
              />
            </svg>
            <span>Unlock exclusive features, benefits, and more!</span>
          </p>
        </div>

        {/* Button to access Premium features */}
        <div>
          {/* <button className="btn btn-accent px-8 py-4 text-lg font-semibold transition-all duration-200 ease-in-out hover:bg-blue-500 focus:ring-2 focus:ring-blue-600">
            Access Premium Content
          </button> */}
        </div>

        {/* Bottom Note */}
        <div className="mt-6 text-sm text-gray-300">
          <p>Thank you for being a part of our premium community!</p>
        </div>
      </div>
    </div>
  ) : (
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
                ₹ 300 /month
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
                ₹ 800/month
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
