import { configureStore } from "@reduxjs/toolkit";
import todolist from "./reducers/todolist";

const store = configureStore({
    reducer: todolist
})

export default store