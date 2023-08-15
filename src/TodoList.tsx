import React, {useRef, useState} from "react";
import {TypeFilter} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import './App.css'
import AddItemTask from "./AddItemTask";
import EditableTitle from "./EditableTitle";
import {Button, Paper, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Unstable_Grid2';
import Grid2 from "@mui/material/Unstable_Grid2";

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
    addTask: (title: string, todoListId: string) => void
    onCheckBox: (id: string, todoListId: string) => void
    filter: string
    removeTodoList: (todoListId: string) => void
    changeTitleTodoLists: (title: string, todoListId: string) => void
    changeTitleTask: (title: string, taskId: string, todoLIstId: string) => void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const newTitleTodoList = (title: string) => {
        props.changeTitleTodoLists(title, props.id)
    }

//Animation for li
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    return (
        <div>
            <Paper style={{padding: "5px"}} elevation={24}>
                <div>
                    <EditableTitle title={props.title} callBack={newTitleTodoList}/>
                    <DeleteIcon style={{margin: "0 5px"}} onClick={() => props.removeTodoList(props.id)}
                                fontSize={"small"}/>
                    <AddItemTask addItem={addTask}/>
                    <Grid container>
                        <Grid xs={10}>
                            <ul ref={listRef}>
                                {props.tasks.map((task: TaskType) => {
                                    const newTitleTask = (title: string) => {
                                        props.changeTitleTask(title, task.id, props.id)
                                    }
                                    return (
                                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                            <input
                                                type="checkbox"
                                                checked={task.isDone}
                                                onChange={() => props.onCheckBox(task.id, props.id)}
                                            />
                                            <EditableTitle title={task.title} callBack={newTitleTask}/>
                                            <DeleteIcon style={{margin: "0 5px"}}
                                                        onClick={() => props.removeTask(task.id, props.id)}
                                                        fontSize={"small"}/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Grid>
                    </Grid>
                    <div>
                        <Stack spacing={1} direction='row'>
                            <Button variant={"contained"} className={props.filter === "all" ? "btn-color" : ""}
                                    onClick={() => props.filterName("all", props.id)}>All</Button>
                            <Button variant={"contained"} className={props.filter === "active" ? "btn-color" : ""}
                                    onClick={() => props.filterName("active", props.id)}>Active</Button>
                            <Button variant={"contained"} className={props.filter === "completed" ? "btn-color" : ""}
                                    onClick={() => props.filterName("completed", props.id)}>Completed</Button>
                        </Stack>

                    </div>
                </div>
            </Paper>
        </div>
    )
}