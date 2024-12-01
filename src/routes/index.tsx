import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { HomePage } from "../pages/HomePage";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/authContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const isLogged = useContext(AuthContext)?.user.isLogged;
  return isLogged ? (children as ReactNode) : <SignUpPage />;
}

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sigup",
    element: <SignUpPage />,
  },
]);
