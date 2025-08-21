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
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
    editTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id == payload.id) {
          return {
            ...todo,
            title: payload.title,
            completed: payload.completed,
          };
        } else {
          return todo;
        }
      });
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todoslice.actions;
export default todoslice.reducer;
