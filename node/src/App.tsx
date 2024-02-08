import { useState } from "react";
import reactLogo from "./assets/react.svg";
import LoginForm from "./components/LoginForm";
import axios from "axios";

function App() {
  const requestLogin = async (email: string, password: string) => {
    const res = await axios.post(`/api/login`, {
      email,
      password,
    });
    console.log(res);
  };
  return (
    <>
      <head>
        <title>app</title>
      </head>
      <body>
        <h2>test</h2>
        <LoginForm handleParamSubmit={requestLogin} />
      </body>
    </>
  );
}

export default App;
