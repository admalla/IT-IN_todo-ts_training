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
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterName: (str: TypeFilter) => void
    removeAllTasks: () => void
    addTask: (title: string) => void
    onCheckBox: (id: string) => void
    filter: string
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
            props.addTask(title )
            setTitle('')
        } else {
            setError("Заполните строку!")
        }
    }



    const onKeyPressHandler = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() && e.key === 'Enter') {
            props.addTask(title);
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
                <h3>{props.title}</h3>
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
                <button onClick={props.removeAllTasks} style={{margin: "10px 0"}}>Delete all</button>
                <ul ref={listRef}>
                    {props.tasks.map((task: TaskType) => {
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={() => props.onCheckBox(task.id)}
                                />
                                <span>{task.title}</span>
                                <button onClick={() => props.removeTask(task.id)}>x</button>
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <button className={props.filter === "all" ? "btn-color" : ""}
                            onClick={() => props.filterName("all")}>All</button>
                    <button className={props.filter === "active" ? "btn-color" : ""}
                            onClick={() => props.filterName("active")}>Active</button>
                    <button className={props.filter === "completed" ? "btn-color" : ""}
                            onClick={() => props.filterName("completed")}>Completed</button>
                    <button className={props.filter === "three" ? "btn-color" : ""}
                            onClick={() => props.filterName("three")}>Three tasks</button>
                </div>
            </div>
        </div>
    )
}