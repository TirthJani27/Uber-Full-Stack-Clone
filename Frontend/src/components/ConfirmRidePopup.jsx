import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";
const ConfirmRidePopup = (props) => {
  const [otp, setOtp] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
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
          <h2 className="text-xl font-medium ">Harshita Rajput</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 km</h5>
      </div>

      <div className="flex justify-between items-center flex-col gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 ">
            <i className="ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya Talab, Ahmedabad{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2 ">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya Talab, Ahmedabad{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <i className=" text-lg ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹193.20</h3>
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
            <button className="text-center w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
              <Link to={"/captain-riding"}>Confirm</Link>
            </button>
          </form>
          <button
            onClick={() => {
              props.setConfirmRidePopupPannel(false);
              props.setRidePopupPannel(false);
            }}
            className="w-full mt-1 bg-red-500 text-white font-semibold p-2 rounded-lg "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
