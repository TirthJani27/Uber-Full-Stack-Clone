import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const token = localStorage.getItem("captain-token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_API_URL}users/logout`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        localStorage.removeItem("captain-token");
        navigate("/captain-login");
      }
    });

  return <div>CaptainLogout</div>;
};

export default CaptainLogout;
