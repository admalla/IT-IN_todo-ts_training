import {AddTodoListAT, getTodoListDomainAT, RemoveTodoListAT} from "./todoList-reducer";
import {TaskAPI, TaskAPIType, TaskPriorities, TaskStatuses} from "../../api/TaskAPI";
import {Dispatch} from "redux";

const GET_TASKS = "GET-TASKS"


export type TasksType = {
    [key: string]: Array<TaskAPIType>
}

type addNewTaskAT = {
    type: "ADD-TASK"
    todoListId: string
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

type getTasksAT = {
    type: typeof GET_TASKS
    tasks: TaskAPIType[]
    todolistId: string
}

type ActionsType =
    addNewTaskAT
    | removeTaskAT
    | changeCheckBoxTaskAT
    | changeTitleTaskAT
    | RemoveTodoListAT
    | AddTodoListAT
    | getTodoListDomainAT
    | getTasksAT

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
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
                        ? {...t, status: t.status ? t.status = TaskStatuses.New : t.status = TaskStatuses.Completed}
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
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export const addNewTaskAC = (todoListId: string, title: string): addNewTaskAT => ({
    type: "ADD-TASK",
    todoListId,
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


//...................tasks from server.....................
const getTasksFromServerAC = (tasks: TaskAPIType[], todolistId: string) => ({
    type: GET_TASKS,
    tasks,
    todolistId
})

export const getTasksFromServerTC = (todolistId: string) => (dispatch: Dispatch) => {
    TaskAPI.getTasks(todolistId).then(res => {
        dispatch(getTasksFromServerAC(res.data.items, todolistId))
    })
}
export const removeTaskFromServerTC = (todolistId: string, taskId: string) => (dispach: Dispatch) => {
    TaskAPI.deleteTask(todolistId, taskId).then(res => {
        dispach(removeTaskAC(todolistId, taskId))
    })
}
export const addTaskFromServerTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    TaskAPI.createTask(todolistId, title).then(res => {
        dispatch(addNewTaskAC(todolistId, title))
    })
}
export const updateTitleTaskFromServerTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch) => {
    TaskAPI.updateTask(todolistId, taskId, title).then(res => {
        dispatch(changeTitleTaskAC(todolistId, taskId, title))
    })
}