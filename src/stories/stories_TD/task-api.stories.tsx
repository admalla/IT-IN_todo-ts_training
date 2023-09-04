import {Meta} from "@storybook/react";
import {useEffect, useState} from "react";
import {TaskAPI} from "../../api/TaskAPI";

export const GetTasks = () => {
    const [tasks, setTasks] = useState<any>(null)

    const todolistId = "39669962-c33d-4432-8b90-1155dbca7fb3"

    useEffect(() => {
        TaskAPI.getTasks(todolistId).then(res => setTasks(res.data))
    }, []);

    return <div>{JSON.stringify(tasks)}</div>
}

export const CreateTask = () => {
    const [tasks, setTasks] = useState<any>(null)

    const todolistId = "39669962-c33d-4432-8b90-1155dbca7fb3"

    useEffect(() => {
        TaskAPI.createTask(todolistId, "new Task").then(res => setTasks(res.data))
    }, []);

    return <div>{JSON.stringify(tasks)}</div>
}

export const UpdateTask = () => {
    const [tasks, setTasks] = useState<any>(null)

    const todolistId = "39669962-c33d-4432-8b90-1155dbca7fb3"
    const taskId = "b082ef4d-de0b-48ae-9e74-5e26073f45a6"

    useEffect(() => {
        TaskAPI.updateTask(todolistId, taskId, "update Task").then(res => setTasks(res.data))
    }, []);

    return <div>{JSON.stringify(tasks)}</div>
}

export const DeleteTask = () => {
    const [tasks, setTasks] = useState<any>(null)

    const todolistId = "39669962-c33d-4432-8b90-1155dbca7fb3"
    const taskId = "1f0aa56d-100d-41ca-8af1-52fb43a37a95"

    useEffect(() => {
        TaskAPI.deleteTask(todolistId, taskId, ).then(res => setTasks(res.data))
    }, []);

    return <div>{JSON.stringify(tasks)}</div>
}

const meta: Meta = {
    title: 'TASK/API',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

