import React, {useRef, useState} from "react";
import {TypeFilter} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import './App.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    filterName: (str: TypeFilter, todoListId: string) => void
    removeAllTasks: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    onCheckBox: (id: string, todoListId: string) => void
    filter: string
    removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>("")

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }

    const onClickHandler = () => {
        if(title.trim()) {
            props.addTask(title, props.id )
            setTitle('')
        } else {
            setError("Заполните строку!")
        }
    }



    const onKeyPressHandler = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() && e.key === 'Enter') {
            props.addTask(title, props.id);
            setTitle('');
        } else {
            setError("Заполните строку!")
        }
    }

//Animation for li
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    return (
        <div>
            <div>
                <h3>{props.title} <button onClick={() => props.removeTodoList(props.id)}>X</button> </h3>
                <div>
                    <input
                        className={error && "error"}
                        value={title}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyPressHandler}
                    />
                    <button onClick={onClickHandler}>+</button>
                    <div style={{color: "red"}}>{error ? error : ''}</div>
                </div>
                <button onClick={() => props.removeAllTasks(props.id)} style={{margin: "10px 0"}}>Delete all</button>
                <ul ref={listRef}>
                    {props.tasks.map((task: TaskType) => {
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={() => props.onCheckBox(task.id, props.id)}
                                />
                                <span>{task.title}</span>
                                <button onClick={() => props.removeTask(task.id, props.id)}>x</button>
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <button className={props.filter === "all" ? "btn-color" : ""}
                            onClick={() => props.filterName("all", props.id)}>All</button>
                    <button className={props.filter === "active" ? "btn-color" : ""}
                            onClick={() => props.filterName("active", props.id)}>Active</button>
                    <button className={props.filter === "completed" ? "btn-color" : ""}
                            onClick={() => props.filterName("completed", props.id)}>Completed</button>
                    <button className={props.filter === "three" ? "btn-color" : ""}
                            onClick={() => props.filterName("three", props.id)}>Three tasks</button>
                </div>
            </div>
        </div>
    )
}