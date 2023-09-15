import {instance} from "./instance";
import {TodoListWithFilterType} from "../state/reducers/todoList-reducer";

export type TodoListAPIType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TodolistResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}


export const TodolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodoListWithFilterType>>("todo-lists")
    },
    createTodoList(title: string) {
        return instance.post<TodolistResponseType<{item: TodoListAPIType}>>('todo-lists', {title})
    },
    updateTodolist(id: string, title: string) {
        return instance.put<TodolistResponseType>(`todo-lists/${id}`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<TodolistResponseType>(`todo-lists/${id}`)
    }
}