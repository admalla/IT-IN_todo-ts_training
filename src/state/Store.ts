import {todoListReducer} from "./reducers/todoList-reducer";
import {taskReducer} from "./reducers/task-reducer";
import {combineReducers, legacy_createStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)