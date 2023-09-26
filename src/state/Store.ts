import {TodoActionsType, todoListReducer} from "./reducers/todoList-reducer";
import {TaskActionsType, taskReducer} from "./reducers/task-reducer";
import {applyMiddleware, combineReducers, legacy_createStore, ThunkAction} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {ActionsAppType, AppReducer} from "./reducers/app-reducer";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer,
    app: AppReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export type AppActionsType = TodoActionsType | TaskActionsType | ActionsAppType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))