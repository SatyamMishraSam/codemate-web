import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) return <h1>No Connections found</h1>;

  return (
    <div className="text-center my-18 px-4">
      <h1 className="font-bold text-3xl mt-8">My Connections</h1>

      {/* Centered responsive grid */}
      <div className="flex justify-center">
        <div
          className="grid gap-6 p-4 w-full max-w-screen-xl"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            justifyItems: "center",
          }}
        >
          {connections.map((connection) => {
            if (!connection) return null;

            const { _id, firstName, lastName, age, about, photoURL, gender } = connection;

            return (
              <div
                key={_id}
                className="flex flex-col items-center m-4 p-6 rounded-lg bg-base-300 shadow-lg hover:shadow-xl 
                           transition-shadow duration-300 ease-in-out w-full max-w-xs"
              >
                <div className="flex-shrink-0">
                  <img
                    src={photoURL}
                    alt="photo"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <div className="mt-4 flex flex-col justify-center text-left space-y-2">
                  <h2 className="text-xl font-semibold">
                    {firstName + " " + lastName}
                  </h2>
                  <div>
                    <span className="text-blue-500 font-medium">Age:</span> {age || "Not Mentioned"}
                  </div>
                  <div>
                    <span className="text-blue-500 font-medium">Gender:</span> {gender || "Not Mentioned 😔"}
                  </div>
                  <div>
                    <span className="text-blue-500 font-medium">About:</span> {about}
                  </div>
                </div>
                <Link to={"/chat/" + _id}>
                  <button className="btn btn-primary mt-4 px-6 py-2 rounded-lg">
                    Chat
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
