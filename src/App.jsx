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
    <div className="mt-20 customContainer">
      <div className="mainDiv">
        <h1 className="flex justify-center">Todo</h1>
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center relative left-[6rem] mainImgLoc">
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
      <ul className="flex flex-col items-center gap-5 relative top-[10rem] rigth-[2rem] pb-20">
        {todos &&
          todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input type="checkbox" name="" className="todoCheck" />
                <h4
                  className="todoItem"
                  onDoubleClick={() => handleEdit(todo)}
                  style={{ opacity: todo.completed && "0.3" }}
                >
                  {todo.title}
                  <button
                    className="deleteBtn"
                    onClick={() => dispatch(removeTodo(todo.id))}
                  >
                    X
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
