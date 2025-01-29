import io from "socket.io-client";
import { BASE_URL } from "./constants";

// This is the socket client setup need to be done
export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL); //connect to the backend
  } else {
    return io("/", { path: "/api/socket.io" }); // for  production
  }
};
