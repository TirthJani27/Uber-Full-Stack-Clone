import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import axios from "axios";
const ConfirmRidePopup = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(props.ride);
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}rides/start-ride`,
      {
        params: { rideId: props.ride._id, otp: otp },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
        },
      }
    );
    if (res.status == 200) {
      props.setConfirmRidePopupPannel(false);
      props.setRidePopupPannel(false);
      navigate("/captain-riding", { state: { ride: props.ride } });
    }
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>

      <div className="flex items-center justify-between rounded-lg bg-yellow-600 p-3 mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdBuvbsYu7WYAAUY2AqSQRGNESsYdkucDkQ&s"
            alt=""
          />
          <h2 className="text-xl font-medium ">
            {props.ride?.user?.fullname.firstname}{" "}
            {props.ride?.user.fullname.lastname ?? " "}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 km</h5>
      </div>

      <div className="flex justify-between items-center flex-col gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 ">
            <i className="ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2 ">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <i className=" text-lg ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form action="" onSubmit={submitHandler}>
            <Input
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              type="number"
              label="Enter OTP"
              size={6}
            />
            <button className="w-full mt-4 bg-green-600 text-white font-semibold p-3 rounded-lg">
              Confirm
            </button>
          </form>
          <button
            onClick={() => {
              props.setConfirmRidePopupPannel(false);
              props.setRidePopupPannel(false);
            }}
            className="w-full mt-1 bg-red-500 text-white font-semibold p-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
