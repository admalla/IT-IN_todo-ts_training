import React from "react";
import {TypeFilter} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (id:number) => void
    filterName: (str: TypeFilter) => void
    removeAllTasks: () => void
}

export function TodoList(props: PropsType) {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <button onClick={props.removeAllTasks} style={{margin: "10px 0"}}>Delete all</button>
                <ul>
                    {props.tasks.map((task: TaskType) => {
                        return (
                            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
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