import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ childern }) => {
  const { userData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/start");
  } else {
    navigate("/home");
  }

  return <div>{childern}</div>;
};

export default UserProtectWrapper;
