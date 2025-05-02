import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setUserData(res.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [token, navigate, setUserData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
