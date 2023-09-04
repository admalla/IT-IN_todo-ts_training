import {instance} from "./instance";

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: number
}

type TaskResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

export const TaskAPI = {
    getTasks(todolistId: string) {
        return  instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return  instance.post<TaskResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return  instance.delete<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return  instance.put<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}