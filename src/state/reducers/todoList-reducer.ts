import {TodoListsType, TypeFilter} from "../../App/App";
import {v1} from "uuid";

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    id: string
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

export type ActionsType = AddTodoListAT | RemoveTodoListAT | changeFilterTodoListAT | changeTitleTodoListAT

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: Array<TodoListsType> = []

export const todoListReducer = (state: Array<TodoListsType> = initialState, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case "ADD-TODOLIST" :
            return [{id: action.id, title: action.title, filter: 'all'}, ...state]
        case "REMOVE-TODOLIST" :
            return  state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const addTodoListAC = (title: string, id: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title,
        id
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
