import { ReactNode, createContext, useEffect, useState } from "react";
import { getTodos, postTodo } from "../services/api";
import { Todo, TodosContextTypes } from "../interface";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const TodosContext = createContext<TodosContextTypes | undefined>(
  undefined
);
export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const username = user?.name;
  useEffect(() => {
    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchTodos() {
    try {
      setLoading(true);
      const todos = await getTodos(userId);
      setTodos(todos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const addTodo = async (title: string) => {
    try {
      setLoading(true);
      const newTodo = await postTodo({ title, userId, username });
      setTodos((prev) => (prev ? [...prev, newTodo] : []));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = async (todoId: string) => {
    try {
      setLoading(true);
      const todoToUpdate = todos.find((todo) => todo._id === todoId);
      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate?.completed,
      };
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
      await axios.put(
        `${import.meta.env.VITE_API_URL}/todos/${todoId}`,
        updatedTodo
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (id: string, newData: string) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/todos/${id}`,
        { title: newData }
      );
      if (!data) throw Error;
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? { ...todo, ...data } : todo))
      );
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTodoById = async (id: string) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/todos/${id}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
      await fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        addTodo,
        setTodos,
        todos,
        loading,
        toggleCompleted,
        editTodo,
        getTodoById,
        deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
