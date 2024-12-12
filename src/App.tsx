import { AuthProvider, User } from "./context/authContext";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
