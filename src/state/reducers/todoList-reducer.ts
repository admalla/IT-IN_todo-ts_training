import {v1} from "uuid";
import {Dispatch} from "redux";
import {TodoListAPIType, TodolistsAPI} from "../../api/TodolistAPI";

const GET_TODOLIST_DOMAIN = "GET-TODOLIST-DOMAIN"

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
type changeFilterTodoListAT = {
    type: "CHANGE-FILTER"
    todoListId: string
    filter: TypeFilter
}
type changeTitleTodoListAT = {
    type: "CHANGE-TITLE"
    todoListId: string
    title: string
}

export type TypeFilter = "all" | "active" | "completed"
export type TodoListWithFilterType = TodoListAPIType & {
    filter: TypeFilter
}

export type getTodoListDomainAT = {
    type: typeof GET_TODOLIST_DOMAIN
    todolist: TodoListWithFilterType[]
}


export type ActionsType = AddTodoListAT
    | RemoveTodoListAT
    | changeFilterTodoListAT
    | changeTitleTodoListAT
    | getTodoListDomainAT

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: Array<TodoListWithFilterType> = []

export const todoListReducer = (state: Array<TodoListWithFilterType> = initialState, action: ActionsType): Array<TodoListWithFilterType> => {
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
            return state = action.todolist
        default:
            return state
    }
}

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
export const changeFilterTodoListAC = (todoListId: string, filter: TypeFilter): changeFilterTodoListAT => ({
    type: "CHANGE-FILTER",
    todoListId,
    filter
})
export const changeTitleTodoListAC = (todoListId: string, title: string): changeTitleTodoListAT => ({
    type: "CHANGE-TITLE",
    todoListId,
    title
})


//............todolist from server...............
const getTodoListDomainAC = (todolist: TodoListWithFilterType[]): getTodoListDomainAT => ({
    type: GET_TODOLIST_DOMAIN,
    todolist
})

export const getTodoListDomainTC = () => {
    return (dispatch: Dispatch) => {
        TodolistsAPI.getTodolists().then((res) => {
            dispatch(getTodoListDomainAC(res.data))
        })
    }
}
export const addTodolistFromServerTC = (title: string) => (dispatch: Dispatch) => {
    TodolistsAPI.createTodoList(title).then(res => {
        dispatch(addTodoListAC(title, res.data.data.item.id))
    })
}
export const removeTodolistFromServerTC = (todolistId: string) => (dispatch: Dispatch) => {
    TodolistsAPI.deleteTodolist(todolistId).then(res => {
        dispatch(removeTodoListAC(todolistId))
    })
}
export const changeTitleTLFromServerTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    TodolistsAPI.updateTodolist(todolistId, title).then(res => {
        dispatch(changeTitleTodoListAC(todolistId, title))
    })
}
