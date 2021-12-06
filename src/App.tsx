import Pages from "./components/Pages";
import { UserContext } from "./lib/context";
import { useUserData } from "./lib/hooks";
import { Toaster } from "react-hot-toast";

export default function App() {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Pages />
      <Toaster position="bottom-center" />
    </UserContext.Provider>
  );
}
