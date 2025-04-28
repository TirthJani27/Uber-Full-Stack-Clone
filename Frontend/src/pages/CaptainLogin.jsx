import React, { useContext } from "react";

import { Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}captains/login`,
      {
        email,
        password,
      }
    );
    if (response.status == 200) {
      const data = response.data;
      localStorage.setItem("captain-token", data.token);
      setCaptain(data.captain);
      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex flex-col justify-between px-6 py-8">
      <form onSubmit={onSubmit}>
        <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="uber logo"
        />
        <div className="mb-6">
          <h3 className="mb-2 text-xl">What's your email</h3>
          <Input
            label="E-mail"
            type="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <h3 className="mb-2 text-xl">Enter Password</h3>
          <Input
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="py-3 text-center font-semibold text-white bg-black rounded-lg w-full"
          >
            Login
          </button>
        </div>
        <div className="mt-2 text-center">
          <span className="text-gray-700">Join the fleet? </span>
          <Link to={"/captain-signup"}>
            <span className="text-blue-700">Register as a Captain</span>
          </Link>
        </div>
      </form>

      <div>
        <Link to={"/login"}>
          <button className="py-3 bg-[#d5622d] mb-10 text-center font-semibold text-white rounded-lg w-full">
            Sign in as User
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
