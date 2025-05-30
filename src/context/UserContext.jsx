import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { isTokenExpired } from "../utils/expired";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);

  const getAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        setCurrentUser(null);
        setCurrentToken(null);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {
          refreshToken: refreshToken,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
        setCurrentToken(access_token);
      }
    } catch (err) {
      console.error("Failed to refresh token:", err.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("access_token");

      if (storedUser && storedToken) {
        if (isTokenExpired(storedToken)) {
          await getAccessToken();
          const newToken = localStorage.getItem("access_token");
          if (newToken) {
            setCurrentUser(JSON.parse(storedUser));
            setCurrentToken(newToken);
          } else {
            setCurrentUser(null);
            setCurrentToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
          }
        } else {
          setCurrentUser(JSON.parse(storedUser));
          setCurrentToken(storedToken);
        }
      } else {
        await getAccessToken();
        const newToken = localStorage.getItem("access_token");
        if (newToken) {
          const user = localStorage.getItem("user");
          if (user) setCurrentUser(JSON.parse(user));
          setCurrentToken(newToken);
        }
      }
    };

    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, currentToken, setCurrentToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
