import React from "react";
import { Routes, Route } from "react-router-dom";
import CaptinLogin from "./pages/CaptainLogin";
import Start from "./pages/Start.jsx";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import UserLogout from "./pages/UserLogout.jsx";
import CaptinSignup from "./pages/CaptainSignup";
import Home from "./pages/Home.jsx";
import UserProtectWrapper from "./pages/UserProtectWrapper.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper.jsx";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainLogout from "./pages/CaptainLogout.jsx";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/start" element={<Start />} />
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
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        ></Route>
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
