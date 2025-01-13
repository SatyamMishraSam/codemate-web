import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, skills, about, photoURL, gender } =
    user;
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (e) {}
  };

  return (
    <div className="card  bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {" "}
          <span className="text-blue-500">Name:</span>{" "}
          {firstName + " " + lastName}
        </h2>

        <p>
          {" "}
          <span className="text-blue-500">Age:</span> {age}
        </p>
        <p>
          {" "}
          <span className="text-blue-500">Gender:</span>{" "}
          {gender ? gender : "Not Mentioned 😔"}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto", // Optional, for handling long arrays
            gap: "10px", // Space between elements
            whiteSpace: "nowrap", // Ensures no wrapping of text
          }}
        >
          {skills &&
            skills.map((skill, index) => (
              <div key={index}>
                <button className="btn btn-outline btn-warning my-5">
                  {skill}
                </button>
              </div>
            ))}
        </div>
        <p>
          {" "}
          <span className="text-blue-500">About:</span> {about}
        </p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore{" "}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
