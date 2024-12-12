import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { firebaseConfig } from "../utils/firebaseConfig";
import { useState, useEffect, ReactNode, createContext } from "react";

export type User = {
  isLogged: boolean;
  email: string | null;
  token: string | null;
  userId: string | null;
};

interface AuthProviderType {
  userLogin: (email: string, password: string) => Promise<void>;
  userSignUp: (email: string, password: string) => Promise<void>;
  user: User | null;
}

const defaultUser = {
  isLogged: false,
  email: null,
  token: null,
  userId: null,
} as User;

const defaultContext = {
  userLogin(email: string, password: string) {
    return Promise.resolve();
  },
  userSignUp(email: string, password: string) {
    return Promise.resolve();
  },
  user: defaultUser,
};

export const AuthContext = createContext<AuthProviderType>(defaultContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);

  //signUp function
  const userSignUp = async (email: string, password: string) => {
    try {
      if (email && password) {
        const URI = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
        const response = await axios.post(URI, {
          email,
          password,
          returnSecureToken: true,
        });

        const { idToken } = response.data;
        const { user_id, email: decodedEmail } = jwtDecode(idToken) as {
          user_id: string;
          email: string;
        };

        setUser(() => ({
          email: decodedEmail,
          token: idToken,
          userId: user_id,
          isLogged: true,
        }));
        localStorage.setItem("accessToken", idToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Login function
  const userLogin = async (email: string, password: string) => {
    const URI = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
    try {
      if (email && password) {
        const response = await axios.post(URI, {
          email,
          password,
          returnSecureToken: true,
        });

        const { idToken } = response.data;

        localStorage.setItem("accessToken", idToken);

        const decodedToken = jwtDecode(idToken) as {
          user_id: string;
          email: string;
        };

        setUser(() => ({
          isLogged: true,
          token: idToken,
          email: decodedToken.email,
          userId: decodedToken.user_id,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const idToken = localStorage.getItem("accessToken");
    if (idToken) {
      const decodedToken = jwtDecode(idToken) as {
        user_id: string;
        email: string;
      };

      setUser(() => ({
        isLogged: true,
        token: idToken,
        email: decodedToken.email,
        userId: decodedToken.user_id,
      }));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        userSignUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
