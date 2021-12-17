import { createContext } from "react";

// TODO: fix types
export const UserContext = createContext<{
  user: any;
  uid: any;
  userData: any;
}>({
  user: null,
  uid: null,
  userData: null,
});
