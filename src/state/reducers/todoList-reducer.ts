import {TodoListAPIType, TodolistsAPI} from "../../api/TodolistAPI";
import {AppThunk} from "../Store";


const initialState: Array<TodoListWithFilterType> = []

export const todoListReducer = (state: Array<TodoListWithFilterType> = initialState, action: TodoActionsType): Array<TodoListWithFilterType> => {
    switch (action.type) {
        case "ADD-TODOLIST" :
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
        case "REMOVE-TODOLIST" :
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "GET-TODOLIST-DOMAIN":
            return action.todolist.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}


//....actions
export const addTodoListAC = (title: string, todolistId: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId
    }
}
export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    todoListId
})
export const changeFilterTodoListAC = (todoListId: string, filter: TypeFilter) => ({
    type: "CHANGE-FILTER",
    todoListId,
    filter
} as const)
export const changeTitleTodoListAC = (todoListId: string, title: string) => ({
    type: "CHANGE-TITLE",
    todoListId,
    title
} as const)
const getTodoListDomainAC = (todolist: TodoListWithFilterType[]): getTodoListDomainAT => ({
    type: "GET-TODOLIST-DOMAIN",
    todolist
} as const)


//...thunks
export const getTodoListDomainTC = (): AppThunk => async dispatch => {
    try {
        const res = await TodolistsAPI.getTodolists()
        dispatch(getTodoListDomainAC(res.data))
    } catch (e) {
        throw new Error(`${e}`)
    }

}
export const addTodolistFromServerTC = (title: string): AppThunk => async dispatch => {
    try {
        const res = await TodolistsAPI.createTodoList(title)
        dispatch(addTodoListAC(title, res.data.data.item.id))
    } catch (e) {
        throw new Error(`${e}`)
    }
}
export const removeTodolistFromServerTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await TodolistsAPI.deleteTodolist(todolistId)
        dispatch(removeTodoListAC(todolistId))
    } catch (e) {
        throw new Error(`${e}`)
    }
}
export const changeTitleTLFromServerTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await TodolistsAPI.updateTodolist(todolistId, title)
        dispatch(changeTitleTodoListAC(todolistId, title))
    } catch (e) {
        throw new Error(`${e}`)
    }
}


//....types
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
export type getTodoListDomainAT = {
    type: "GET-TODOLIST-DOMAIN"
    todolist: TodoListWithFilterType[]
}
export type TypeFilter = "all" | "active" | "completed"
export type TodoListWithFilterType = TodoListAPIType & {
    filter: TypeFilter
}

export type TodoActionsType =
    | AddTodoListAT
    | RemoveTodoListAT
    | ReturnType<typeof changeFilterTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | getTodoListDomainAT

