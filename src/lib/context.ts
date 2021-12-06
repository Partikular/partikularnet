import { createContext } from "react";

export const UserContext = createContext<{ user: any; uid: any }>({
  user: null,
  uid: null,
});
