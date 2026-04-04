import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });

    setFirstName("");
    setLastName("");
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
          <h3 className="text-base font-medium mb-2">What's your name?</h3>

          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-1/2 placeholder:text-base"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-1/2 placeholder:text-base"
              type="text"
              placeholder="Last Name (optional)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded-lg px-4 py-2 w-full placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mt-7 mb-2">Password</h3>
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
            Sign Up
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div>
        <p className="text-[12px] text-gray-500 text-center leading-tight">
          By proceeding, you agree to get calls, WhatsApp messages, and SMS from Uber, including by automated means, from Uber and its affiliates to the phone number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignupPage;
