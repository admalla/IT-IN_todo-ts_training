import {instance} from "./instance";

type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodoListType>>("todo-lists")
    },
    createTodoList(title: string) {
        return instance.post<Array<TodoListType>>('todo-lists', {title})
    },
    updateTodolist(id: string, title: string) {
        return instance.put<Array<TodoListType>>(`todo-lists/${id}`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<Array<TodoListType>>(`todo-lists/${id}`)
    }
}