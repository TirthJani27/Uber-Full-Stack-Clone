import React, { useState, useContext } from "react";

import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useContext(UserDataContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUserData({ fullname: { firstname, lastname }, email });
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex flex-col justify-between px-6 py-8">
      <form onSubmit={onSubmitHandler}>
        <img
          className="w-20"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="uber logo"
        />
        <div className="mb-6">
          <h3 className="mb-2 text-xl">What's our Captain's name</h3>

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
          <div className="mb-6 ">
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
          <h3 className="mb-2 text-xl">What's our Captain's email</h3>
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
          <Link to={"/captain-login"}>
            <span className="text-blue-700">Login here</span>
          </Link>
        </div>
      </form>

      <div>
        <p className="text-gray-700 mb-5 text-[10px]">
          This site is protected by reCAPTCHA and the Google{" "}
          <span className="text-blue-700 underline">Privacy Policy</span> and{" "}
          <span className="text-blue-700 underline">Terms of Service</span>{" "}
          apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
