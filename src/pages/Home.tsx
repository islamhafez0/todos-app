import { useState } from "react";
import AddTodo from "../components/AddTodo";
import TodosList from "../components/TodosList";
import { Todo } from "../interface";
import { useTodos } from "../hooks/useTodos";

const Home = () => {
  const [edittingTodo, setEdittingTodo] = useState<Todo | null>(null);
  const { getTodoById } = useTodos();
  const handleEditTodo = async (id: string) => {
    const todo = await getTodoById(id);
    setEdittingTodo(todo);
  };
  return (
    <>
      <AddTodo edittingTodo={edittingTodo!} setEdittingTodo={setEdittingTodo} />
      <TodosList handleEditTodo={handleEditTodo} />
    </>
  );
};

export default Home;
