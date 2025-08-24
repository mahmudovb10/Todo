import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : {
      todos: [],
    };

const todoslice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    editTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload.id
          ? { ...todo, title: payload.title, completed: payload.completed }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state));
    },
    filter: (state, { payload }) => {
      const saved = JSON.parse(localStorage.getItem("todos"))?.todos || [];

      if (payload === "all") {
        state.todos = saved;
      } else if (payload === "active") {
        state.todos = saved.filter((item) => !item.completed);
      } else if (payload === "completed") {
        state.todos = saved.filter((item) => item.completed);
      }
    },
  },
});

export const { addTodo, removeTodo, editTodo, filter } = todoslice.actions;
export default todoslice.reducer;
