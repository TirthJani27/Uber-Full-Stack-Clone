import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePannel, setFinishRidePannel] = useState(false);

  const finishRidePannelRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePannel) {
        gsap.to(finishRidePannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePannel]
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
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div
        onClick={() => {
          setFinishRidePannel(true);
        }}
        className="h-1/5 p-6 relative bg-yellow-600 flex items-center justify-between"
      >
        <h5
          className="p-1 text-center w-[100%] rotate-180 absolute -top-1 left-0"
          onClick={() => {}}
        >
          <i className="z-20 text-3xl ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4KM away</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePannelRef}
        className="fixed z-10 bg-white w-full bottom-0 px-3 py-6 translate-y-full pt-12"
      >
        <FinishRide setFinishRidePannel={setFinishRidePannel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
