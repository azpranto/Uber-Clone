import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import toast from "react-hot-toast";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");

  const vehicles = [
    { id: "car", label: "Car", icon: "🚗" },
    { id: "motorcycle", label: "Motorcycle", icon: "🏍️" },
    { id: "cng", label: "CNG", icon: "🛺" },
  ];

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        licensePlate: licensePlate,
        capacity: capacity,
        type: type,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captains/register`,
        newCaptain,
      );

      if (response.status === 201) {
        const data = response.data;

        setCaptain(data.captain);
        localStorage.setItem("captainToken", data.token);

        navigate("/captain-main");
      }
    } catch (error) {
      if (error.response.status === 400) {
        const data = error.response.data;
        navigate("/captain-login");
        toast.error(data.message || "Registration failed!");
      }
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setColor("");
    setLicensePlate("");
    setCapacity("");
    setType("");
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
          <h3 className="text-base font-medium mt-7 mb-2">
            Vehicle Information
          </h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-1/2 placeholder:text-base"
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-1/2 placeholder:text-base"
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] rounded-lg px-4 py-2 w-full placeholder:text-base"
              type="car"
              placeholder="License Plate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
            <div className="flex gap-4">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setType(vehicle.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    type === vehicle.id
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-[#eeeeee] bg-white text-gray-700"
                  }`}
                >
                  <span className="text-lg">{vehicle.icon}</span>
                  <span className="text-sm font-medium">{vehicle.label}</span>
                </button>
              ))}
            </div>
          </div>
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
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">
            <a href="https://policies.google.com/privacy?hl=en-US">
              Google Privacy Policy
            </a>
          </span>{" "}
          and{" "}
          <span className="underline">
            <a href="https://policies.google.com/terms?hl=en-US">
              Terms of Service
            </a>
          </span>{" "}
          apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
