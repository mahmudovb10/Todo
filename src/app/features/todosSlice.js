import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : {
      todos: [],
      backup: [],
      actives: 0,
    };

const todoslice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      state.backup = [...state.todos];
      localStorage.setItem("todos", JSON.stringify(state)); // ✅ saqlash
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
      state.backup = [...state.todos];
      localStorage.setItem("todos", JSON.stringify(state)); // ✅ saqlash
    },
    editTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload.id
          ? { ...todo, title: payload.title, completed: payload.completed }
          : todo
      );
      state.backup = [...state.todos];
      localStorage.setItem("todos", JSON.stringify(state)); // ✅ saqlash
    },
    filter: (state, { payload }) => {
      if (payload === "all") {
        state.todos = state.backup;
      } else if (payload === "active") {
        state.todos = state.backup.filter((item) => !item.completed);
      } else if (payload === "completed") {
        state.todos = state.backup.filter((item) => item.completed);
      }
    },
  },
});

export const { addTodo, removeTodo, editTodo, filter } = todoslice.actions;
export default todoslice.reducer;
