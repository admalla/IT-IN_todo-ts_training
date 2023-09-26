import {AddTodoListAT, getTodoListDomainAT, RemoveTodoListAT} from "./todoList-reducer";
import {TaskAPI, TaskAPIType, TaskPriorities, TaskStatuses} from "../../api/TaskAPI";
import {AppRootState, AppThunk} from "../Store";
import {setErrorAC, setStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from 'axios'
import {PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: TaskActionsType): TasksType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListId]:
                    [{
                        id: '',
                        title: action.title,
                        status: TaskStatuses.New,
                        todoListId: action.todoListId,
                        addedDate: '',
                        deadline: '',
                        startDate: '',
                        order: 0,
                        description: '',
                        priority: TaskPriorities.Hi
                    }, ...state[action.todoListId]]
            }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListId]:
                    state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "CHANGE-CHECKBOX-TASK":
            return {
                ...state,
                [action.todoListId]:
                    state[action.todoListId].map(t => t.id === action.taskId
                        ? {...t, status: action.status}
                        : t)
            }
        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.todoListId]:
                    state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case "REMOVE-TODOLIST": {
            delete state[action.todoListId]
            return state
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "GET-TODOLIST-DOMAIN": {
            const copyState = {...state}
            action.todolist.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "GET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
    }
}

//....actions
export const addNewTaskAC = (todoListId: string, title: string) => ({
    type: "ADD-TASK",
    todoListId,
    title
}as const )
export const removeTaskAC = (todoListId: string, taskId: string) => ({
    type: "REMOVE-TASK",
    todoListId,
    taskId
} as const)
export const changeCheckBoxTaskAC = (todoListId: string, taskId: string, status: TaskStatuses) => ({
    type: "CHANGE-CHECKBOX-TASK",
    todoListId,
    taskId,
    status
}as const )
export const changeTitleTaskAC = (todoListId: string, taskId: string, title: string) => ({
    type: "CHANGE-TITLE-TASK",
    todoListId,
    taskId,
    title
} as const)
const getTasksFromServerAC = (tasks: TaskAPIType[], todolistId: string) => ({
    type: "GET-TASKS",
    tasks,
    todolistId
} as const)


//....thunks
export const getTasksFromServerTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await TaskAPI.getTasks(todolistId)
        dispatch(getTasksFromServerAC(res.data.items, todolistId))
    } catch (e) {
        throw new Error(`${e}`)
    }
}
export const removeTaskFromServerTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC('loading'))
        const res = await TaskAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(todolistId, taskId))
    }catch (e) {
        if(axios.isAxiosError(e)) {
            handleServerNetworkError(dispatch, e.message)
            dispatch(setStatusAC('success'))
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    } finally {
        dispatch(setStatusAC('idle'))
    }
}
export const addTaskFromServerTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    try {
        if(title.length > 100) {
            dispatch(setErrorAC('Must be under 100 characters'))
        } else {
            dispatch(setStatusAC("loading"))
            const res = await TaskAPI.createTask(todolistId, title)
            if(res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(addNewTaskAC(todolistId, title))
                dispatch(setStatusAC("success"))
            } else {
                handleServerAppError(dispatch,res.data)
            }
        }
    } catch (e) {
        if(axios.isAxiosError(e)){
            handleServerNetworkError(dispatch, e.message)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    } finally {
        dispatch(setStatusAC("idle"))
    }
}
export const updateTitleTaskFromServerTC = (todolistId: string, taskId: string, title: string): AppThunk => async (dispatch, getState: () => AppRootState) => {
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    try {
        dispatch(setStatusAC('loading'))
        const res  = await TaskAPI.updateTask(todolistId, taskId, {title, status: task?.status})
        if(res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(changeTitleTaskAC(todolistId, taskId, title))
            dispatch(setStatusAC("success"))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        if(axios.isAxiosError(e)) {
            handleServerNetworkError(dispatch, e.message)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    } finally {
        dispatch(setStatusAC("idle"))
    }
}
export const updateStatusTaskTC = (todoListId: string, taskId: string, status: TaskStatuses): AppThunk => async (dispatch, getState: () => AppRootState) => {
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todoListId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    try {
        if(task) {
            dispatch(setStatusAC('loading'))
            const res =
                await TaskAPI.updateTask(todoListId, taskId, {title: task.title, status})
            if(res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(changeCheckBoxTaskAC(todoListId, taskId, status))
                dispatch(setStatusAC('success'))
            } else {
                handleServerAppError(dispatch,res.data)
            }
        }
    } catch (e) {
        if(axios.isAxiosError(e)) {
            handleServerNetworkError(dispatch, e.message)
        } else {
            handleServerNetworkError(dispatch, (e as Error).message)
        }
    } finally {
        dispatch(setStatusAC('idle'))
    }
}

//...types
export type TasksType = {
    [key: string]: Array<TaskAPIType>
}

export type TaskActionsType =
    | ReturnType<typeof addNewTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckBoxTaskAC>
    | ReturnType<typeof changeTitleTaskAC>
    | RemoveTodoListAT
    | AddTodoListAT
    | getTodoListDomainAT
    | ReturnType<typeof getTasksFromServerAC>

enum RESULT_CODE {
    SUCCESS = 0
}

type ErrorType = {
    "statusCode": 0,
    "messages":[
        {
            "message": string,
            "field": string
        }
    ],
    "error": string
}