import React, { useContext, useEffect } from "react";
import { SignUpView } from "../../views/SignUpView";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export function SignUpContainer() {
  const navigate = useNavigate();
  const {userSignUp, user} = useContext(AuthContext);

  useEffect(() => {
    if(user?.isLogged){
      navigate('/')
    }
  },[user])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if(email && password && userSignUp) {
      userSignUp(email, password)
    }
  }

  return <SignUpView handleSubmit={handleSubmit} />;
}
