import {TodoActionsType, todoListReducer} from "./reducers/todoList-reducer";
import {TaskActionsType, taskReducer} from "./reducers/task-reducer";
import {applyMiddleware, combineReducers, legacy_createStore, ThunkAction} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export type AppActionsType = TodoActionsType | TaskActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))