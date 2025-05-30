import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeModeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <BrowserRouter>
        <SocketProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </SocketProvider>
      </BrowserRouter>
    </ThemeModeProvider>
  </React.StrictMode>
);
