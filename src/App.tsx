import { useState } from "react";
import { HomeContainer } from "./containers/HomeContaier";
import { AuthContext, AuthContextValue, User } from "./context/authContext";
import { LoginContainer } from "./containers/LoginContainer";
import { SignUpContainer } from "./containers/SignUpContainer";

function App() {
  const [user, setUser] = useState<User>({
    isLogged: false,
    email: null,
    token:null
  });
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {user?.isLogged ? <HomeContainer/> : <SignUpContainer/>}
    </AuthContext.Provider>
  );
}

export default App;
