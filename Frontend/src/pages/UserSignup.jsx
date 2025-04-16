import React, { useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";
import { Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserDataContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setUserData({ fullname: { firstname, lastname }, email, password });

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}users/register`,
      {
        fullname: { firstname: firstname, lastname: lastname },
        email,
        password,
      }
    );
    if (response.status === 201 || response.status === 200) {
      const userData = response.data;
      setUserData(userData.user);
      localStorage.setItem("token", JSON.stringify(userData.token));
      navigate("/home");
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex flex-col justify-between px-6 py-8">
      <form onSubmit={onSubmitHandler}>
        <img className="w-20 mb-10" src="logo.png" alt="uber logo" />
        <div className="mb-6">
          <h3 className="mb-2 text-xl">What's your name</h3>

          <div className="mb-3">
            <Input
              label="First Name"
              value={firstname}
              required
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Last Name"
              value={lastname}
              required
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-2 text-xl">What's your email</h3>
          <div className="mb-6">
            <Input
              label="E-mail"
              value={email}
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-2 text-xl">Password</h3>
          <div className="mb-6">
            <Input
              label="Password"
              type="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="py-3 text-center font-semibold text-white bg-black rounded-lg w-full"
          >
            Create Account
          </button>
        </div>
        <div className="mt-2 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <Link to={"/login"}>
            <span className="text-blue-700">Login here</span>
          </Link>
        </div>
      </form>

      <div>
        <p className="text-gray-700 mb-5 text-[10px]">
          By proceeding, you consent to get call, Whatsapp or SMS messages,
          including by automated means, from Uber and its affiliated means, from
          Uber and its affiliated to the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
