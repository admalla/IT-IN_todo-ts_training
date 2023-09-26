import {instance} from "./instance";

export type TaskAPIType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type ItemsType = {
    items: Array<TaskAPIType>
}

export type TaskGeneralResponseType<T = {}> = {
    data: T
    fieldsErrors: []
    messages: string[]
    resultCode: number
}

type TaskGetResponseType = {
    error: string | null
    items: TaskAPIType[]
    totalCount: number
}



export const TaskAPI = {
    getTasks(todolistId: string) {
        return  instance.get<TaskGetResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return  instance.post<TaskGeneralResponseType<ItemsType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return  instance.delete<TaskGeneralResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, {title='', status= 0}) {
        return  instance.put<TaskGeneralResponseType<ItemsType>>(`todo-lists/${todoListId}/tasks/${taskId}`, {title, status})
    }

}