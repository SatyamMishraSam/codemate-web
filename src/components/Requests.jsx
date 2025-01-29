import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { Link } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4 text-center">
        <div className="relative w-40 h-40 md:w-48 md:h-48">
          <img
            src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif"
            alt="No Requests"
            className="w-full h-full animate-bounce"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded-full blur-lg opacity-50 animate-pulse"></div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mt-6">
          No Requests Found
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          You can try refreshing the page or come back later.
        </p>
        <Link
          to="/connections"
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-transform transform hover:scale-105"
        >
          Check Connections
        </Link>
      </div>
    );

  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-bold text-2xl md:text-3xl mt-6 md:mt-8">
        My Requests
      </h1>
      {requests.map((request) => {
        if (!request.fromUserId) {
          return null;
        }
        const { _id, firstName, lastName, age, about, photoURL, gender } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row items-center m-4 p-4 rounded-lg bg-base-300 w-full max-w-2xl mx-auto"
          >
            <div className="flex-shrink-0">
              <img
                src={photoURL}
                alt="photo"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full"
              />
            </div>
            <div className="md:ml-6 mt-4 md:mt-0 flex flex-col md:flex-row justify-between items-center w-full">
              <div className="text-center md:text-left space-y-2 w-full">
                <h2 className="text-lg md:text-xl font-bold">
                  {firstName + " " + lastName}
                </h2>
                <div>
                  <span className="text-blue-500 font-medium">Age:</span>{" "}
                  {age ? age : "Not Mentioned"}
                </div>
                <div>
                  <span className="text-blue-500 font-medium">Gender:</span>{" "}
                  {gender ? gender : "Not Mentioned 😔"}
                </div>
                <div>
                  <span className="text-blue-500 font-medium">About:</span>{" "}
                  {about}
                </div>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                  className="btn btn-primary btn-sm md:btn-md"
                  onClick={() => reviewRequests("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary btn-sm md:btn-md"
                  onClick={() => reviewRequests("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
