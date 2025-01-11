import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.lenth === 0) return <h1>No Requests found</h1>;

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
                <button className="btn btn-primary">Reject</button>
                <button className="btn btn-secondary">Accept</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
