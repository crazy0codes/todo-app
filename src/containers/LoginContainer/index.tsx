import React, { useContext, useEffect } from "react";
import { LoginView } from "../../views/LoginView";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


export function LoginContainer() {
  const navigate = useNavigate()
  const context = useContext(AuthContext);
  const {user, userLogin} = context;

  useEffect(() => {
    if(user?.isLogged === true){
        navigate('/')
      }
      console.log(context)
  },[user])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    userLogin(email, password)
  }

  return <LoginView handleSubmit={handleSubmit} />;
}
