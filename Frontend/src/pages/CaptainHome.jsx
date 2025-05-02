import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { useGSAP } from "@gsap/react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

import gsap from "gsap";

const CaptainHome = () => {
  const { captain } = useContext(CaptainDataContext);
  const { sendMessage, onMessage } = useContext(SocketContext);

  const [ridePopupPannel, setRidePopupPannel] = useState(false);
  const [confirmRidePopupPannel, setConfirmRidePopupPannel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPannelRef = useRef(null);
  const confirmRidePopupPannelRef = useRef(null);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: captain._id });
  }, []);

  const startLocationUpdates = (captainId) => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          sendMessage("update-location-captain", {
            userId: captainId,
            userType: "captain",
            location: {
              ltd: latitude,
              lng: longitude,
            },
          });
        },
        (err) => {
          console.error("Location error:", err);
        }
      );
    }, 10000);
  };

  startLocationUpdates(captain._id);

  onMessage("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopupPannel(true);
  });
  useGSAP(
    function () {
      if (ridePopupPannel) {
        gsap.to(ridePopupPannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPannel]
  );
  useGSAP(
    function () {
      if (confirmRidePopupPannel) {
        gsap.to(confirmRidePopupPannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPannel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          className="w-16 "
          alt="Logo"
        />
        <Link
          to="/captain-login"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPannelRef}
        className="fixed z-10 bg-white w-full bottom-0 translate-y-full px-3 py-10  pt-12"
      >
        <RidePopup
          ride={ride}
          setConfirmRidePopupPannel={setConfirmRidePopupPannel}
          setRidePopupPannel={setRidePopupPannel}
        />
      </div>
      <div
        ref={confirmRidePopupPannelRef}
        className="fixed h-screen z-10 bg-white w-full bottom-0 translate-y-full px-3 py-10  pt-12"
      >
        <ConfirmRidePopup
          setRidePopupPannel={setRidePopupPannel}
          setConfirmRidePopupPannel={setConfirmRidePopupPannel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
