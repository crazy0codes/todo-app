import React, { useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";
import { LoginView } from "../../views/LoginView";
import { AuthContext } from "../../context/authContext";

const auth = getAuth();

export function LoginContainer() {
  const setUser = useContext(AuthContext)?.setUser
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || "";
    if (accessToken) {
      signInWithCustomToken(auth, accessToken)
        .then((userCredential) => {
          const user = userCredential;
          
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if(setUser){
            setUser(prev => ({
              ...prev,
              isLogged: true
            }))
          }
        })
        .catch((error) => {
          console.error("Login failed:", error.message);
          alert(`Login failed: ${error.message}`);
        });
    } else {
      alert("Please fill out both fields.");
    }
  }

  return <LoginView handleSubmit={handleSubmit} />;
}
