import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import LocationSearchPannel from "../components/LocationSearchPannel";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const [vehiclePannelOpen, setVehiclePannelOpen] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const pannelRef = useRef(null);
  const vehiclePannelRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const pannelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (pannelOpen) {
        gsap.to(pannelCloseRef.current, {
          padding: 0,
          opacity: 1,
        });
        gsap.to(pannelRef.current, {
          opacity: 1,
          height: "70%",
          padding: 24,
        });
      } else {
        gsap.to(pannelRef.current, {
          opacity: 0,
          padding: 0,
          height: "0%",
        });
        gsap.to(pannelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [pannelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePannelOpen) {
        gsap.to(vehiclePannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePannelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePannel) {
        gsap.to(confirmRidePannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePannel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5 "
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif"
          alt=""
        />
      </div>
      <div className="h-screen flex justify-end flex-col absolute top-0 w-full ">
        <div className="h-[30%] relative  p-5 bg-white">
          <h5
            className="absolute right-6 opacity-0 top-6 text-2xl"
            ref={pannelCloseRef}
            onClick={() => {
              setPannelOpen(false);
            }}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form
            className="relative"
            action=""
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[35%] left-5 bg-gray-800 rounded-full"></div>
            <input
              onClick={() => {
                setPannelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 rounded-lg text-lg w-full mt-5"
              type="text"
              placeholder="Add a pick up location"
              name=""
              id=""
            />
            <input
              value={destination}
              onClick={() => {
                setPannelOpen(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 rounded-lg text-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              name=""
              id=""
            />
          </form>
        </div>
        <div className=" bg-white opacity-0 " ref={pannelRef}>
          <LocationSearchPannel
            pannelOpen={pannelOpen}
            setPannelOpen={setPannelOpen}
            vehiclePannel={vehiclePannelOpen}
            setVehiclePannel={setVehiclePannelOpen}
          />
        </div>
      </div>
      <div
        className="fixed z-10 bg-white w-full bottom-0 px-3 py-10 translate-y-full pt-12"
        ref={vehiclePannelRef}
      >
        <VehiclePannel
          setConfirmRidePannel={setConfirmRidePannel}
          setVehiclePannel={setVehiclePannelOpen}
        />
      </div>
      <div
        className="fixed z-10 bg-white w-full bottom-0 px-3 py-6 translate-y-full pt-12"
        ref={confirmRidePannelRef}
      >
        <ConfirmRide
          setConfirmRidePannel={setConfirmRidePannel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bg-white w-full bottom-0 px-3 py-6 translate-y-full pt-12"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed z-10 bg-white w-full bottom-0 px-3 py-6 pt-12 translate-y-full"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
