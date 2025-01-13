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

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data.data));
  };

  const reviewRequests = async (status, _id) => {
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
    // console.log(res);
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-100">
        <div className="relative">
          {/* Animated GIF */}
          <img
            src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif"
            alt="No Requests"
            className="w-48 h-48 animate-bounce"
          />
          {/* Animated Circle */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-blue-100 rounded-full blur-lg opacity-50 animate-pulse"></div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-700 mt-8 animate-fade-in">
          No Requests Found
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          You can try refreshing the page or come back later.
        </p>

        {/* Call-to-action Button */}
        <Link
          to="/connections"
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-transform transform hover:scale-105"
        >
          Check Connections
        </Link>
      </div>
    );

  return (
    <div className="text-center my-18">
      <h1 className="text-bold text-3xl mt-8"> My Requests</h1>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          age,
          about,
          skills,
          photoURL,
          gender,
        } = request.fromUserId;

        return (
          <>
            <div
              key={_id}
              className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
            >
              {/* Image Section */}
              <div className="flex-shrink-0">
                <img
                  src={photoURL}
                  alt="photo"
                  className="w-20 h-20 rounded-full"
                />
              </div>

              {/* Details Section */}
              <div className="ml-10 flex flex-1 justify-between items-center">
                {/* Left Column with Text Details */}
                <div className="flex flex-col text-left space-y-2">
                  <h2 className="text-xl font-bold">
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

                {/* Button Section */}
                <div className="flex space-x-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequests("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequests("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
            {showToast && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <span>Profile saved successfully</span>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Requests;
