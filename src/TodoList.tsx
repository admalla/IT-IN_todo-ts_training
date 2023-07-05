import React, {useState} from "react";
import {TypeFilter} from "./App";

export type TaskType = {
    id: string,
    title: string,
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
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>('')

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressHandler = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(title);
            setTitle('');
        }
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                    <button onClick={onClickHandler}>+</button>
                </div>
                <button onClick={props.removeAllTasks} style={{margin: "10px 0"}}>Delete all</button>
                <ul>
                    {props.tasks.map((task: TaskType) => {
                        return (
                            <li key={task.id}>
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
                    <button onClick={() => props.filterName("all")}>All</button>
                    <button onClick={() => props.filterName("active")}>Active</button>
                    <button onClick={() => props.filterName("completed")}>Completed</button>
                    <button onClick={() => props.filterName("three")}>Three tasks</button>
                </div>
            </div>
        </div>
    )
}