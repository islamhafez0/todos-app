import { FaRegEdit } from "react-icons/fa";
import { Todo as TodoType } from "../../interface";
import { BiTrash } from "react-icons/bi";
import Checkbox from "../common/Checkbox";
import { useTodos } from "../../hooks/useTodos";
import { formatTime } from "../../utils/helpers";

const Todo = ({
  todo,
  handleEditTodo,
}: {
  todo: TodoType;
  getTodoById: (id: string) => Promise<TodoType>;
  handleEditTodo: (id: string) => Promise<void>;
}) => {
  const { _id, completed, title, createdAt } = todo;
  const { toggleCompleted, deleteTodo } = useTodos();

  return (
    <li key={_id} className={`todo ${completed ? "completed" : ""}`}>
      <div className="row">
        <h4>{title}</h4>
        <div className="icons">
          <button onClick={async () => await deleteTodo(_id)}>
            <BiTrash />
          </button>
          <button className="edit-todo" onClick={() => handleEditTodo(_id)}>
            <FaRegEdit />
          </button>
          <Checkbox
            id={_id}
            onToggle={async () => await toggleCompleted(_id)}
            completed={completed}
          />
        </div>
      </div>
      <p className="timestamp">{formatTime(createdAt)}</p>
    </li>
  );
};

export default Todo;
