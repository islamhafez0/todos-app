import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("Context must be used within provider");
  }
  return context;
};
