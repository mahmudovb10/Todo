import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  editTodo,
  filter,
} from "./app/features/todosSlice";
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
    const title = formData.get("title")?.trim();
    const completed = formData.get("completed") !== null;

    if (!title) {
      return;
    }

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
    setId("");
    setTitle("");
    setCompleted(false);

    e.target.reset();
  };

  return (
    <div className="mt-20 customContainer">
      <div className="mainDiv">
        <h1 className="flex justify-center">Todo</h1>
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center relative left-[6rem] mainImgLoc">
            <label>Title: </label>
            <input
              value={_title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              className="input"
              placeholder="Create a new todo…"
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
      </div>
      <div className="filterBtns">
        <button className="filterAll" onClick={() => dispatch(filter("all"))}>
          All
        </button>
        <button
          className="filterActive"
          onClick={() => dispatch(filter("active"))}
        >
          Active
        </button>
        <button
          className="filterCompleted"
          onClick={() => dispatch(filter("completed"))}
        >
          Completed
        </button>
        <div className="todoCount">Items left: {todos.length}</div>
      </div>
      <ul className="todoList">
        {todos &&
          todos.map((todo) => (
            <li key={todo.id} className="todoRow">
              <input
                type="checkbox"
                className="todoCheck"
                checked={todo.completed}
                onChange={() =>
                  dispatch(
                    editTodo({
                      ...todo,
                      completed: !todo.completed,
                    })
                  )
                }
              />

              <h4
                className="todoItem"
                onDoubleClick={() => handleEdit(todo)}
                style={{ opacity: todo.completed ? "0.3" : "1" }}
              >
                {todo.title}
              </h4>

              <button
                className="deleteBtn"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                X
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
