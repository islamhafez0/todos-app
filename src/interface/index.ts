import { Dispatch, SetStateAction } from "react";

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TodosContextTypes = {
  addTodo: (title: string) => Promise<void>;
  toggleCompleted: (id: string) => Promise<void>;
  editTodo: (id: string, newData: string) => Promise<Todo>;
  getTodoById: (id: string) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
  loading: boolean;
};
export type User = {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  bio: string;
  email: string;
};
export type AppwriteUser = {
  $id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};
export type AppwriteAuthContextTypes = {
  checkCurrentUser: () => Promise<boolean | undefined>;
  logout: () => Promise<void>;
  isSigningin: boolean;
  setIsSigningin: Dispatch<SetStateAction<boolean>>;
  user: User;
  isAuthenticated: boolean;
  appwriteError: string;
  appwriteLoading: boolean;
};
export type SignupFormInputsTypes = {
  type: string;
  name: keyof SignupFormInputsNames;
  id: string;
  label: string;
};
export type SignupFormInputsNames = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type SigninFormInputsTypes = {
  type: string;
  name: keyof SigninFormInputsNames;
  id: string;
  label: string;
};

export type SigninFormInputsNames = {
  email: string;
  password: string;
};
