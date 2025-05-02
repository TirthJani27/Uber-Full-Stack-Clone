import React from "react";

const RidePopup = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPannel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

      <div className="flex items-center justify-between rounded-lg bg-yellow-600 p-3 mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdBuvbsYu7WYAAUY2AqSQRGNESsYdkucDkQ&s"
            alt=""
          />
          <h2 className="text-xl font-medium ">
            {props.ride.user.fullname.firstname}{" "}
            {props.ride.user.fullname.lastname ?? " "}
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
              <p className="text-sm -mt-1 text-gray-600">{props.ride.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2 ">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <i className=" text-lg ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{props.ride.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setConfirmRidePopupPannel(true);
          }}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg "
        >
          Confirm
        </button>
        <button
          onClick={() => {
            props.setRidePopupPannel(false);
          }}
          className="w-full mt-1 bg-gray-400 text-gray-700 font-semibold p-2 rounded-lg "
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopup;
