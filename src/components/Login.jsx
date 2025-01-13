import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLogin] = useState(false);

  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      toast.success("Login successful!", {
        position: "top-center",
      });
      return navigate("/");
    } catch (e) {
      console.log(e?.response?.data);
      setErr(e?.response?.data);
      toast.error("Login failed! Please check your credentials.", {
        position: "top-center",
      });
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      setErr("All fields are required!");
      toast.error("All fields are required!", {
        position: "top-center",
      });
      return; // Prevent further execution
    }
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      if (res?.data?.data) {
        dispatch(addUser(res.data.data));
        return navigate("/profile");
      } else {
        setErr("Invalid response from server");
        toast.error("Signup failed! Please fill the correct Details.", {
          position: "top-center",
        });
      }
    } catch (e) {
      setErr(e?.response?.data);
      toast.error("Login failed! Please check your credentials.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Create Account"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password </span>
              </div>
              <input
                type="text"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          {err && <p className="text-red-600">Error : {err} </p>}

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
            <ToastContainer position="top-center" />
          </div>
          <p
            className="text-blue-200 text-center cursor-pointer"
            onClick={() => setIsLogin(!isLoginForm)}
          >
            {isLoginForm
              ? "New User ? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
