import { useState } from "react";
import useAuth from "@/useAuth";
import { Navigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

function Login() {
  const { login, isLogin } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(
        "ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。"
      );
    }
  };

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <LoginForm handleParamSubmit={handleLogin} errorMessage={errorMessage} />
  );
}

export default Login;
