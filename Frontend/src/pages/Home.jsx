import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";

import LocationSearchPannel from "../components/LocationSearchPannel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import "remixicon/fonts/remixicon.css";

const Home = () => {
  const { sendMessage, onMessage } = useContext(SocketContext);
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    sendMessage("join", {
      userType: "user",
      userId: userData._id,
    });
  }, []);

  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const [vehiclePannelOpen, setVehiclePannelOpen] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [ride, setRide] = useState(null);
  const [fair, setFair] = useState({
    auto: 0,
    moto: 0,
    car: 0,
  });

  const refs = {
    pannel: useRef(null),
    pannelClose: useRef(null),
    vehiclePannel: useRef(null),
    confirmRidePannel: useRef(null),
    vehicleFound: useRef(null),
    waitingForDriver: useRef(null),
  };

  const animatePanel = (ref, show, animation) => {
    gsap.to(ref.current, show ? animation.enter : animation.exit);
  };

  const fetchSuggestions = useCallback(async (input) => {
    if (!input || input.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("This is searched: ", input);
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }maps/get-suggestion?input=${encodeURIComponent(input)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuggestions(res.data || []);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  }, []);

  async function findTrip(pickup, destination) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }rides/get-fair?pickup=${encodeURIComponent(
          pickup
        )}&destination=${encodeURIComponent(destination)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFair(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  async function createRide() {
    try {
      const token = localStorage.getItem("token");
      const data = {
        pickup,
        destination,
        vehicleType,
      };

      await axios.post(`${import.meta.env.VITE_BASE_URL}rides/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehicleFound(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedInput.length >= 2) {
        fetchSuggestions(debouncedInput);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [debouncedInput, fetchSuggestions]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === "pickup") setPickup(value);
    else setDestination(value);

    setActiveField(type);
    setDebouncedInput(value); // Triggers debounce
  };

  const openPanel = (type) => {
    setPannelOpen(true);
    setActiveField(type);
    const value = type === "pickup" ? pickup : destination;
    setDebouncedInput(value); // Also fetch on panel open
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    animatePanel(refs.pannelClose, pannelOpen, {
      enter: { padding: 0, opacity: 1 },
      exit: { opacity: 0 },
    });
    animatePanel(refs.pannel, pannelOpen, {
      enter: { opacity: 1, height: "70%", padding: 24 },
      exit: { opacity: 0, height: "0%", padding: 0 },
    });
  }, [pannelOpen]);

  useGSAP(() => {
    animatePanel(refs.vehiclePannel, vehiclePannelOpen, {
      enter: { transform: "translateY(0%)" },
      exit: { transform: "translateY(100%)" },
    });
  }, [vehiclePannelOpen]);

  useGSAP(() => {
    animatePanel(refs.confirmRidePannel, confirmRidePannel, {
      enter: { transform: "translateY(0%)", display: "block" },
      exit: { transform: "translateY(100%)", display: "none" },
    });
  }, [confirmRidePannel]);

  useGSAP(() => {
    animatePanel(refs.vehicleFound, vehicleFound, {
      enter: { transform: "translateY(0%)", display: "block" },
      exit: { transform: "translateY(100%)", display: "none" },
    });
  }, [vehicleFound]);

  useGSAP(() => {
    animatePanel(refs.waitingForDriver, waitingForDriver, {
      enter: { transform: "translateY(0%)", display: "block" },
      exit: { transform: "translateY(100%)", display: "none" },
    });
  }, [waitingForDriver]);

  onMessage("ride-confirmed", (ride) => {
    setRide(ride);
    setWaitingForDriver(true);
    setVehicleFound(false);
    setConfirmRidePannel(false);
    setVehiclePannelOpen(false);
  });
  onMessage("ride-started", (ride) => {
    setRide(ride);
    console.log("This is from the home and this is ride: ", ride);
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Pass ride data here
  });

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
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

      <div className="h-screen absolute top-0 w-full flex flex-col justify-end">
        <div className="h-[30%] bg-white relative p-5">
          <h5
            ref={refs.pannelClose}
            className="absolute right-6 top-6 opacity-0 text-2xl cursor-pointer"
            onClick={() => setPannelOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler} className="relative">
            <div className="absolute h-16 w-1 top-[35%] left-5 bg-gray-800 rounded-full"></div>
            <input
              onClick={() => openPanel("pickup")}
              onChange={(e) => handleInputChange(e, "pickup")}
              value={pickup}
              className="bg-[#eee] px-12 py-2 rounded-lg text-lg w-full mt-5"
              type="text"
              placeholder="Add a pick up location"
            />
            <input
              onClick={() => openPanel("destination")}
              onChange={(e) => handleInputChange(e, "destination")}
              value={destination}
              className="bg-[#eee] px-12 py-2 rounded-lg text-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div className="bg-white opacity-0" ref={refs.pannel}>
          <LocationSearchPannel
            findTrip={findTrip}
            pickup={pickup}
            destination={destination}
            pannelOpen={pannelOpen}
            setPannelOpen={setPannelOpen}
            vehiclePannel={vehiclePannelOpen}
            setVehiclePannel={setVehiclePannelOpen}
            suggestions={suggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setFair={setFair}
          />
        </div>
      </div>

      <div
        className="fixed z-10 bg-white w-full bottom-0 px-3 py-10 translate-y-full pt-12"
        ref={refs.vehiclePannel}
      >
        <VehiclePannel
          setVehicleType={setVehicleType}
          fair={fair}
          setConfirmRidePannel={setConfirmRidePannel}
          setVehiclePannel={setVehiclePannelOpen}
        />
      </div>

      <div
        className="fixed z-20 bg-white w-full bottom-0 px-3 py-6 pt-12 translate-y-full transition-transform duration-300"
        ref={refs.confirmRidePannel}
      >
        <ConfirmRide
          fair={fair}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setConfirmRidePannel={setConfirmRidePannel}
          setVehicleFound={setVehicleFound}
        />
      </div>

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

      <div
        ref={refs.waitingForDriver}
        className="fixed z-50 bg-white w-full bottom-0 px-3 py-6 pt-12 translate-y-full"
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
