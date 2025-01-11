import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
      //   console.log(res);
    } catch (e) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.lenth === 0) return <h1>No Connections found</h1>;

  return (
    <div className="text-center my-18">
      <h1 className="text-bold text-3xl mt-8"> My Connections</h1>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          age,
          about,
          skills,
          photoURL,
          gender,
        } = connection;

        return (
          <div
            key={_id}
            className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/4 mx-auto"
          >
            <div className="flex-shrink-0">
              <img
                src={photoURL}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="ml-10 flex flex-col justify-center text-left space-y-2">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
