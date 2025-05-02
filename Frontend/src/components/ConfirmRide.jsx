import React from "react";

const vehicleImages = {
  car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
  auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
  moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
};

const ConfirmRide = ({
  pickup,
  destination,
  fair,
  vehicleType,
  setConfirmRidePannel,
  setVehicleFound,
  createRide,
}) => {
  const imageUrl = vehicleImages[vehicleType] || vehicleImages.moto;

  const handleConfirm = async () => {
    setVehicleFound(true);
    setConfirmRidePannel(false);
    await createRide();
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => setConfirmRidePannel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>

      <div className="flex flex-col items-center gap-4">
        <img className="h-20" src={imageUrl} alt={`${vehicleType} icon`} />

        <div className="w-full mt-5 space-y-3">
          <LocationInfo
            icon="ri-map-pin-user-fill"
            title="Pickup"
            address={pickup}
          />
          <LocationInfo
            icon="ri-map-pin-2-fill"
            title="Destination"
            address={destination}
          />
          <FareInfo amount={parseInt(fair[vehicleType]).toFixed(2)} />
        </div>

        <button
          onClick={handleConfirm}
          className="w-full mt-5 bg-green-600 hover:bg-green-700 transition text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

const LocationInfo = ({ icon, title, address }) => (
  <div className="flex items-center gap-5 p-2 border-b-2">
    <i className={`text-lg ${icon}`}></i>
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm -mt-1 text-gray-600">{address}</p>
    </div>
  </div>
);

const FareInfo = ({ amount }) => (
  <div className="flex items-center gap-5 p-2">
    <i className="text-lg ri-currency-line"></i>
    <div>
      <h3 className="text-lg font-medium">₹{amount}</h3>
      <p className="text-sm -mt-1 text-gray-600">Cash</p>
    </div>
  </div>
);

export default ConfirmRide;
