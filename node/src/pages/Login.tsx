import useAuth from "@/useAuth";
import { Navigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

function Login() {
  const { login, isLogin } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return <LoginForm handleParamSubmit={handleLogin} />;
}

export default Login;
