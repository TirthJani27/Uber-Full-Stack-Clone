import React from "react";

const vehicleImages = {
  car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
  auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
  moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
};

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a driver</h3>
      <div className="flex justify-between items-center flex-col gap-2">
        <img
          className="h-20"
          src={vehicleImages[props.vehicleType ?? " "]}
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2 ">
            <i className="ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2 ">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <i className=" text-lg ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">
                ₹
                {props?.fair[props.vehicleType] ??
                  "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VehicleFoundComponent = ({
  vehicleFound,
  refs,
  fair,
  vehicleType,
  pickup,
  destination,
  setVehicleFound,
}) => {
  return (
    <>
      {vehicleFound && (
        <div
          ref={refs.vehicleFound}
          className="fixed z-10 bg-white w-full bottom-0 px-3 py-6 translate-y-full pt-12"
        >
          <LookingForDriver
            fair={fair}
            vehicleType={vehicleType}
            pickup={pickup}
            destination={destination}
            setVehicleFound={setVehicleFound}
          />
        </div>
      )}
    </>
  );
};

export default VehicleFoundComponent;
