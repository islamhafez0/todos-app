import { useTodos } from "../hooks/useTodos";
import Loader from "./common/Loader";
import Todo from "./specific/Todo";

const TodosList = ({
  handleEditTodo,
}: {
  handleEditTodo: (id: string) => Promise<void>;
}) => {
  const { todos, loading, getTodoById } = useTodos();
  return (
    <ul className="todos">
      {!todos || (todos?.length == 0 && !loading) ? (
        <p
          style={{
            textAlign: "center",
            color: "#cccccc8a",
            fontSize: 15,
          }}
        >
          No Todos
        </p>
      ) : (
        todos?.map((todo) => (
          <Todo
            todo={todo}
            key={todo._id}
            getTodoById={getTodoById}
            handleEditTodo={handleEditTodo}
          />
        ))
      )}
      {loading && (
        <div className="loader-wrapper">
          <Loader height="25px" width="25px" />
        </div>
      )}
    </ul>
  );
};

export default TodosList;
