import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();
import interceptors from "../config/axiosInstance";

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const user = await axios.get("http://localhost:3333/users/aboutme", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setUser(user.data);
    } catch (error) {
      console.log("error", error);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };
  useEffect(() => {
    handleAuth();
    interceptors();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("accessToken", userData.access_token);

    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/products");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
