import React from "react";

const LocationSearchPannel = (props) => {
  const {
    suggestions = [],
    setPickup,
    setDestination,
    activeField,
    setVehiclePannel,
    setPannelOpen,
    pickup,
    destination,
    findTrip,
  } = props;

  return (
    <div className="max-h-[400px] overflow-y-auto px-4">
      {suggestions.length === 0 && (
        <div className="text-gray-400 text-center py-4">No suggestions</div>
      )}
      {suggestions.map((e, index) => (
        <div
          onClick={async () => {
            if (activeField === "pickup") setPickup(e.description);
            if (activeField === "destination") {
              setDestination(e.description);
              await findTrip(pickup, destination);
              setPannelOpen(false);
              setVehiclePannel(true);
            }
          }}
          key={index}
          className="flex my-2 items-center gap-4 justify-start border-gray-50 border-2 active:border-black p-3 rounded"
        >
          <div className="bg-[#eee] rounded-full h-8 w-12 flex items-center justify-center">
            <i className="ri-map-pin-fill"></i>
          </div>
          <h4 className="font-medium">{e.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPannel;
