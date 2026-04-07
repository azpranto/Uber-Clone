import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UsrContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userdata = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        userdata,
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        localStorage.setItem("token", data.token);
        navigate("/main");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-10"
          src="https://www.movex.ai/assets/images/uber_clone.png"
          alt="Uber Clone"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded-lg px-4 py-2 w-full placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mt-7 mb-2">Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded-lg px-4 py-2 w-full"
            type="password"
            placeholder="Password"
          />
          <button
            className="bg-[#111111] text-white rounded-lg px-4 py-2 w-full mt-4"
            type="submit"
          >
            Login
          </button>

          <p className="mt-4 text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-500">
              Create an account
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="bg-[#ffd902] flex items-center justify-center text-black rounded-lg px-4 py-2 w-full mt-4 mb-10"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
