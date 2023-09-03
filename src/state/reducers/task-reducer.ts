import {TaskType} from "../../TodoList";
import {AddTodoListAT, RemoveTodoListAT, todoListId1, todoListId2} from "./todoList-reducer";
import {v1} from "uuid";


export type TasksType = {
    [key: string]: Array<TaskType>
}

type addNewTaskAT = {
    type: "ADD-TASK"
    todoListId: string
    taskId: string
    title: string
}
type removeTaskAT = {
    type: "REMOVE-TASK"
    todoListId: string
    taskId: string
}
type changeCheckBoxTaskAT = {
    type: "CHANGE-CHECKBOX-TASK"
    todoListId: string
    taskId: string
}
type changeTitleTaskAT = {
    type: "CHANGE-TITLE-TASK"
    todoListId: string
    taskId: string
    title: string
}

type ActionsType = addNewTaskAT | removeTaskAT | changeCheckBoxTaskAT | changeTitleTaskAT | RemoveTodoListAT | AddTodoListAT

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListId]:
                    [{id: action.taskId, title: action.title, isDone: false}, ...state[action.todoListId]]
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
                    state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: !t.isDone} : t)
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
                [action.id]: []
            }
        default:
            return state
    }
}

export const addNewTaskAC = (todoListId: string, taskId: string, title: string): addNewTaskAT => ({
    type: "ADD-TASK",
    todoListId,
    taskId,
    title
})
export const removeTaskAC = (todoListId: string, taskId: string): removeTaskAT => ({
    type: "REMOVE-TASK",
    todoListId,
    taskId
})
export const changeCheckBoxTaskAC = (todoListId: string, taskId: string): changeCheckBoxTaskAT => ({
    type: "CHANGE-CHECKBOX-TASK",
    todoListId,
    taskId
})
export const changeTitleTaskAC = (todoListId: string, taskId: string, title: string): changeTitleTaskAT => ({
    type: "CHANGE-TITLE-TASK",
    todoListId,
    taskId,
    title
})