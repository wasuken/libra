import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { Book } from "./const";

const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      setToken(response.data.access_token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const genAfetch = (tk) => {
    return (url, params = {}) => {
      let eParams = { ...params };
      if (!eParams.headers) {
        eParams.headers = {};
      }
      if (!eParams.headers.Authorization) {
        eParams.headers.Authorization = `Bearer ${tk}`;
        eParams.headers["Content-Type"] = "application/json";
      }
      console.log("debug", eParams);
      return fetch(url, eParams);
    };
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime > exp;
  };

  const isLogin = !isTokenExpired(token);

  return {
    token,
    login,
    logout,
    isTokenExpired,
    isLogin,
    afetch: genAfetch(token),
  };
};

export default useAuth;
