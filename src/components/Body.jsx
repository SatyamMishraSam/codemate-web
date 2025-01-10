import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

// why fetchUser =>
// we have to login to access / page
// Now we can't access any page without login

// whenever we login => our creds => store
// but if we refresh our page then its getting loggedout  but still my token is there in the cookie
// our main page is body , onload => we will fetch whethere user is there or not and that can be done with /profile page
// so everytime our page (body) gets loaded we will make a call to /profile and if token is there then we will get the details of user and put to store

// if token is not there then will say to login

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (e) {
      navigate("/login");

      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
