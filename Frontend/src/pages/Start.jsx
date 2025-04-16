import React from "react";
import { Link } from "react-router-dom";
const Start = () => {
  return (
    <>
      <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1617479582427-e67ee0e3c0cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen flex flex-col justify-between bg-center">
        <img className="w-24 pl-5 pt-5" src="logo.png" alt="Uber Logo" />
        <div className="bg-white py-4 px-2">
          <h2 className="text-3xl pb-6 font-semibold text-center">
            Get started with Uber
          </h2>
          <Link to={"/login"}>
            <p className="py-3 text-center font-semibold text-xl text-white bg-black rounded-lg">
              Continue
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start;
