import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("captain-token");
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        setCaptain(res.data.captain);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log("Error Here: ", err);
      localStorage.removeItem("captain-token");
      navigate("/captain-login");
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default CaptainProtectWrapper;
