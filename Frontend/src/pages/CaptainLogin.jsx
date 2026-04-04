import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password,
    });

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
            Join us?{" "}
            <Link to="/captain-signup" className="text-blue-500">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/login"
          className="bg-[#35ff02] flex items-center justify-center text-black rounded-lg px-4 py-2 w-full mt-4 mb-10"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
