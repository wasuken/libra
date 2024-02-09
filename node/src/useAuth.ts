import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      setToken(response.data.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    console.log(token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    const iat = payload.iat;
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime > iat;
  };

  const isLogin = !isTokenExpired(token);

  return { token, login, logout, isTokenExpired, isLogin };
};

export default useAuth;
