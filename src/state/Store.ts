import {TodoActionsType, todoListReducer} from "./reducers/todoList-reducer";
import {TaskActionsType, taskReducer} from "./reducers/task-reducer";
import {applyMiddleware, combineReducers, legacy_createStore, ThunkAction} from "@reduxjs/toolkit";
import thunk, {ThunkDispatch} from "redux-thunk";
import {ActionsAppType, AppReducer} from "./reducers/app-reducer";
import {ActionsAuthType, authReducer} from "./reducers/auth-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer,
    app: AppReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export type AppActionsType = TodoActionsType | TaskActionsType | ActionsAppType | ActionsAuthType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootState, unknown, AppActionsType>>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector