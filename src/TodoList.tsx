import React, {useCallback} from "react";
import {TypeFilter} from "./App/App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import './App/App.css'
import AddItemTask from "./AddItemTask/AddItemTask";
import EditableTitle from "./EditableTitle/EditableTitle";
import {Button, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    filterName: (str: TypeFilter, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    onCheckBox: (id: string, todoListId: string) => void
    filter: TypeFilter
    removeTodoList: (todoListId: string) => void
    changeTitleTodoLists: (title: string, todoListId: string) => void
    changeTitleTask: (title: string, taskId: string, todoLIstId: string) => void
}

export const TodoList = React.memo( (props: PropsType) => {

    const getFilteredTasks = (tasks: TaskType[], filter: TypeFilter) => {
        switch (filter) {
            case "active" :
                return tasks.filter((task:TaskType) => task.isDone === false)
            case "completed":
                return tasks.filter((task: TaskType) => task.isDone === true)
            default :
                return tasks
        }
    }

    const filteredTasks: Array<TaskType> =  getFilteredTasks(props.tasks, props.filter)

    const addTask = useCallback( (title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const newTitleTodoList = useCallback( (title: string) => {
        props.changeTitleTodoLists(title, props.id)
    }, [props.changeTitleTodoLists, props.id])

//Animation for li
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    return (
        <div>
            <div>
                <EditableTitle title={props.title} callBack={newTitleTodoList}/>
                <DeleteIcon style={{margin: "0 5px"}} onClick={() => props.removeTodoList(props.id)}
                            fontSize={"small"}/>
                <AddItemTask addItem={addTask}/>
                <ul ref={listRef}>
                    {filteredTasks.map((task: TaskType) =>
                        <Task
                            key={task.id}
                            onCheckBox={props.onCheckBox}
                            changeTitleTask={props.changeTitleTask}
                            removeTask={props.removeTask}
                            todoListId={props.id}
                            task={task}
                        />
                    )}
                </ul>
                <div>
                    <Stack spacing={1} direction='row'>
                        <Button variant={"contained"} className={props.filter === "all" ? "btn-color" : ""}
                                onClick={() => props.filterName("all", props.id)}>All</Button>
                        <Button variant={"contained"} className={props.filter === "active" ? "btn-color" : ""}
                                onClick={() => props.filterName("active", props.id)}>Active</Button>
                        <Button variant={"contained"}
                                className={props.filter === "completed" ? "btn-color" : ""}
                                onClick={() => props.filterName("completed", props.id)}>Completed</Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
})
