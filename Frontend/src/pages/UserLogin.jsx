import React, { useContext, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserDataContext);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}users/login`,
      { email, password }
    );

    if (response.status == 200) {
      const userData = response.data;
      setUserData(userData.user);
      localStorage.setItem("token", JSON.stringify(userData.token));
      navigate("/home");
    }
    setPassword("");
  };

  return (
    <div className="h-screen flex flex-col justify-between px-6 py-8">
      <form onSubmit={onSubmit}>
        <div>
          <img className="w-20 mb-10" src="logo.png" alt="uber logo" />
          <div className="mb-6">
            <h3 className="mb-2 text-xl">What's your email</h3>
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
          <div>
            <h3 className="mb-2 text-xl">Enter Password</h3>
            <Input
              required
              label="Password"
              type="password"
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
            <span className="text-gray-700">New here? </span>
            <Link to={"/signup"}>
              <span className="text-blue-700">Create new Account</span>
            </Link>
          </div>
        </div>
      </form>

      <div>
        <Link to={"/captain-login"}>
          <button className="py-3 bg-[#10b461] mb-10 text-center font-semibold text-white rounded-lg w-full">
            Sign in as Captain
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
