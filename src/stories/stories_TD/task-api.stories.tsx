import {Meta} from "@storybook/react";
import {useEffect, useState} from "react";
import {TaskAPI} from "../../api/TaskAPI";

export const GetTasks = () => {
    const [tasks, setTasks] = useState<any>(null)

    const todolistId = "509cebcf-5b5c-4955-b72f-744d695e15c4"

    useEffect(() => {
        TaskAPI.getTasks(todolistId).then(res => setTasks(res.data))
    }, []);

    return <div>{JSON.stringify(tasks)}</div>
}

export const CreateTask = () => {
    const [tasks, setTasks] = useState<any>(null)

    const todolistId = "509cebcf-5b5c-4955-b72f-744d695e15c4"

    useEffect(() => {
        TaskAPI.createTask(todolistId, "NEW Task").then(res => setTasks(res.data.data))
    }, []);

    return <div>{JSON.stringify(tasks)}</div>
}

export const UpdateTask = () => {
    const [tasks, setTasks] = useState<any>(null)

    const todolistId = "509cebcf-5b5c-4955-b72f-744d695e15c4"
    const taskId = "22bc1771-a655-480b-822d-d12ab750a806"

    useEffect(() => {
        TaskAPI.updateTask(todolistId, taskId, "update TASK").then(res => setTasks(res.data.data))
    }, []);

    return <div>{JSON.stringify(tasks)}</div>
}

export const DeleteTask = () => {
    const [tasks, setTasks] = useState<any>(null)

    const todolistId = "509cebcf-5b5c-4955-b72f-744d695e15c4"
    const taskId = "ebbaf04d-1d66-4fe0-95a9-8d0485efbdac"

    useEffect(() => {
        TaskAPI.deleteTask(todolistId, taskId, ).then(res => setTasks(res.data.data))
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

