import { useContext } from "react";
import { AppWriteAuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AppWriteAuthContext);
  if (!context) throw Error("Context must be used within provider");
  return context;
};
