import { createRoot } from "react-dom/client";
import "./index.css";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketContext from "./context/SocketContext.jsx";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <CaptainContext>
    <UserContext>
      <SocketContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContext>
    </UserContext>
  </CaptainContext>
);
