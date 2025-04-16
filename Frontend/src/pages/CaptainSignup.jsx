import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [vehicleColor, setVehicleColor] = useState("");
  const { setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}captains/register`,
      {
        fullname: {
          firstname,
          lastname,
        },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType,
        },
      }
    );
    if (response.status == 201 || response.status == 200) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setCaptain(response.data.captain);
      navigate("/captain-home");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleType("");
    setVehiclePlate("");
    setVehicleCapacity(0);
    setVehicleColor("");
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
        <div className="mb-6">
          <h3 className="mb-2 text-xl">Vehicle Information</h3>
          <div className="flex-1">
            <select
              value={vehicleType}
              required
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-lg"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Bike</option>
            </select>
          </div>
          <div className="mb-3">
            <Input
              label="Vehicle Plate"
              value={vehiclePlate}
              required
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Vehicle Capacity"
              value={vehicleCapacity}
              required
              type="number"
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Vehicle Color"
              value={vehicleColor}
              required
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="py-3 text-center font-semibold text-white bg-black rounded-lg w-full"
          >
            Create Captain Account
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
