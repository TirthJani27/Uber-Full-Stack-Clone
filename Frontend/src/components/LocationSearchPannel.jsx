import React from "react";

const LocationSearchPannel = (props) => {
  console.log(props);

  const location = [
    "24B, Near Kapoor's Cafe, Opp Kanaiya Hotel, Rajkot",
    "29E, Near Gupta's Cafe, Opp Kanaiya Hotel, New Delhi",
    "26D, Near Adani's Cafe, Opp Kanaiya Hotel, New Delhi",
    "69Z, Near Sharmani's Cafe, Opp Kanaiya Hotel, New Delhi",
  ];
  return (
    <div>
      {location.map((e, index) => (
        <div
          onClick={() => {
            props.setVehiclePannel(true);
            props.setPannelOpen(false);
            console.log(props.vehiclePannel);
          }}
          key={index}
          className="flex my-2 items-center gap-4 justify-start h-max border-gray-50 border-2 active:border-black p-3 rounded "
        >
          <h2 className="bg-[#eee] rounded-full h-8 w-12 flex items-center justify-center ">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{e}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPannel;
