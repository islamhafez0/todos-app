import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../interface";
import { FaEdit } from "react-icons/fa";

const AddTodo = ({
  edittingTodo,
  setEdittingTodo,
}: {
  edittingTodo: Todo;
  setEdittingTodo: React.Dispatch<SetStateAction<Todo | null>>;
}) => {
  useEffect(() => {
    if (edittingTodo) {
      setTodoValue(edittingTodo.title);
      setIsEditMode(true);
    } else {
      setTodoValue("");
      setIsEditMode(false);
    }
  }, [edittingTodo]);

  const [todoValue, setTodoValue] = useState(
    edittingTodo ? edittingTodo.title : ""
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { addTodo, loading, editTodo } = useTodos();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoValue.trim() === "") return;
    if (isEditMode && edittingTodo) {
      if (todoValue === edittingTodo.title) {
        return;
      }
      await editTodo(edittingTodo._id, todoValue);
    } else {
      await addTodo(todoValue);
    }
    setTodoValue("");
    setIsEditMode(false);
    setEdittingTodo(null);
  };

  const cancelEditingTodo = () => {
    setEdittingTodo(null);
    setIsEditMode(false);
    setTodoValue("");
  };

  return (
    <form className="addTodo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo">{isEditMode ? "Edit Todo" : "Add New Todo"}</label>
      {isEditMode && <span onClick={cancelEditingTodo}>Cancel</span>}
      <div className="input_wrapper">
        <input
          type="text"
          id="todo"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Add Todo"
          disabled={
            loading ||
            todoValue.trim() === "" ||
            todoValue === edittingTodo?.title
          }
          className={`${
            loading ||
            todoValue.trim() === "" ||
            todoValue === edittingTodo?.title
              ? "disabled"
              : ""
          }`}
        >
          {isEditMode ? <FaEdit size={22} /> : <IoMdAdd size={22} />}
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
