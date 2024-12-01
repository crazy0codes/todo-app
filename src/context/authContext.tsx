import { initializeApp } from "firebase/app";
import { createContext } from "react";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  appId: string;
  messagingSenderId: string;
};

export type User = {
  isLogged: boolean;
  email: string | null;
  token: string | null;
};

export type AuthContextValue = {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>> | null;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyA3U-DMt_FjbZ2XBjIjeLe27TuvuQ_6IEU",
  authDomain: "todo-app-23a8f.firebaseapp.com",
  projectId: "todo-app-23a8f",
  storageBucket: "todo-app-23a8f.appspot.com",
  messagingSenderId: "515948203240",
  appId: "1:515948203240:web:048a5058ebc3c149bc4d5d",
};

export const fireBaseApp = initializeApp(firebaseConfig);
export const AuthContext = createContext<AuthContextValue | null>(null);