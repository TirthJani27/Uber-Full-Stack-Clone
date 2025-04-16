import React from "react";
import { Routes, Route } from "react-router-dom";
import CaptinLogin from "./pages/CaptainLogin";
import Start from "./pages/Start.jsx";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptinSignup from "./pages/CaptainSignup";
import Home from "./pages/Home.jsx";
import UserProtectWrapper from "./pages/UserProtectWrapper.jsx";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-login" element={<CaptinLogin />} />
        <Route path="/captain-signup" element={<CaptinSignup />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/users/logout"
          element={
            <UserProtectWrapper>
              <UserLogout></UserLogout>
            </UserProtectWrapper>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
