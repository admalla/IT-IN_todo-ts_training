import {TodoListsType} from "../App";
import {TaskType} from "../TodoList";


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
    isDone: boolean
}
type changeTitleTaskAT = {
    type: "CHANGE-TITLE-TASK"
    todoListId: string
    taskId: string
    title: string
}
type removeAllTasksByTodoListIdAT = {
    type: "REMOVE-ALL-TASKS"
    todoListId: string
}

type ActionsType = addNewTaskAT | removeTaskAT | changeCheckBoxTaskAT | changeTitleTaskAT | removeAllTasksByTodoListIdAT

export const taskReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case "ADD-TASK":
            return {...state,
                [action.todoListId]:
                    [{id: action.taskId, title: action.title, isDone: false}, ...state[action.todoListId]]
            }
        case "REMOVE-TASK":
            return {...state,
                [action.todoListId]:
                    state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "CHANGE-CHECKBOX-TASK":
            return {...state,
                [action.todoListId]:
                    state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone}: t)}
        case "CHANGE-TITLE-TASK":
            return {...state,
                [action.todoListId]:
                    state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.title}: t)}
        case "REMOVE-ALL-TASKS": {
            delete state[action.todoListId]
            return state
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
export const changeCheckBoxTaskAC = (todoListId: string, taskId: string, isDone: boolean): changeCheckBoxTaskAT => ({
    type: "CHANGE-CHECKBOX-TASK",
    todoListId,
    taskId,
    isDone
})
export const changeTitleTaskAC = (todoListId: string, taskId: string, title: string): changeTitleTaskAT => ({
    type: "CHANGE-TITLE-TASK",
    todoListId,
    taskId,
    title
})
export const removeAllTasksByTodoListIdAC = (todoListId: string): removeAllTasksByTodoListIdAT => ({
    type: "REMOVE-ALL-TASKS",
    todoListId
})