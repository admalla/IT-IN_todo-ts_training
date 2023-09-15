import {useEffect, useState} from "react";
import {TodolistsAPI} from "../../api/TodolistAPI";
import {Meta, StoryObj} from "@storybook/react";


export const GetTodoLists  = () => {
    const [todolists, setTodolists] = useState<any>(null)

    useEffect(() => {
        TodolistsAPI.getTodolists().then((res) => setTodolists(res.data))


    }, [])


    return <div>{
        JSON.stringify(todolists)
    }</div>
}
export const CreateTodolist = () => {
    const [todolists, setTodolists] = useState<any>(null)

    useEffect(() => {
        TodolistsAPI.createTodoList("new todoList").then(res => setTodolists(res.data))
    }, [])

    const lists = JSON.stringify(todolists)

    return <div>{
        lists
    }</div>

}
export const DeleteTodoList = () => {
    const [todolists, setTodolists] = useState<any>(null)
    const todolistId = "8963bb50-5620-4f28-997f-4131dcede030"
    useEffect(() => {
        TodolistsAPI.deleteTodolist(todolistId).then(res => setTodolists((res.data)))
    }, []);

}
export const UpdateTodoList = () => {
    const [todolists, setTodolists] = useState<any>(null)
    const todolistId = "39669962-c33d-4432-8b90-1155dbca7fb3"
    useEffect(() => {
        TodolistsAPI.updateTodolist(todolistId, "update Todolist")
            .then((res) => setTodolists(res.data))
    }, [])


    return <div>{
        JSON.stringify(todolists)
    }</div>
}

const meta: Meta = {
    title: 'TODOLIST/API',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;


