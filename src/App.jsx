import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTodo } from "./app/features/todosSlice";
import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [_title, setTitle] = useState("");
  const [_completed, setCompleted] = useState("");

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setCompleted(todo.completed);
    setId(todo.id);
  };

  const { todos } = useSelector((store) => store.todos);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const completed = formData.get("completed") !== null;

    if (id) {
      dispatch(
        editTodo({
          id,
          title,
          completed,
        })
      );
      setId("");
      setTitle("");
      setCompleted(false);
    } else {
      dispatch(
        addTodo({
          id: Math.random(),
          title,
          completed,
        })
      );
    }

    e.target.reset();
  };

  return (
    <div className="mt-20">
      <h1 className="flex justify-center">Todo List Crud</h1>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center relative left-[6rem]">
          <label>Title: </label>
          <input
            defaultValue={_title}
            name="title"
            type="text"
            className="input"
          />
        </div>
        <div className="relative top-[5rem] right-[3rem]">
          <label>Completed: </label>
          <input
            defaultChecked={_completed}
            type="checkbox"
            name="completed"
            className="checkbox checkbox-primary"
          />
        </div>
        <button className="btn btn-outline btn-primary relative top-[8rem] right-[9rem]">
          Add Todo
        </button>
      </form>
      <ul className="flex flex-col items-center gap-5 relative top-[10rem] rigth-[2rem] ">
        {todos &&
          todos.map((todo) => {
            return (
              <li key={todo.id}>
                <h4 style={{ opacity: todo.completed && "0.3" }}>
                  {todo.title}
                  <button
                    onClick={() => {
                      handleEdit(todo);
                    }}
                    className="btn btn-active btn-primary ml-2.5"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline btn-error ml-2.5"
                    onClick={() => dispatch(removeTodo(todo.id))}
                  >
                    Delete
                  </button>
                </h4>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
