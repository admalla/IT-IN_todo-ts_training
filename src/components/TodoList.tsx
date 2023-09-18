import React, {useCallback, useEffect} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import '../App/App.css'
import AddItemTask from "../AddItemTask/AddItemTask";
import EditableTitle from "../EditableTitle/EditableTitle";
import {Button, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";
import {TaskAPIType, TaskStatuses} from "../api/TaskAPI";
import {TypeFilter} from "../state/reducers/todoList-reducer";
import {useDispatch} from "react-redux";
import {getTasksFromServerTC} from "../state/reducers/task-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppRootState} from "../state/Store";
import {AnyAction} from "redux";

export type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskAPIType>
    removeTask: (id: string, todoListId: string) => void
    filterName: (str: TypeFilter, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    onCheckBox: (id: string, todoListId: string, isChecked: boolean) => void
    filter: TypeFilter
    removeTodoList: (todoListId: string) => void
    changeTitleTodoLists: (title: string, todoListId: string) => void
    changeTitleTask: (title: string, taskId: string, todoLIstId: string) => void
}

export const TodoList = React.memo( (props: PropsType) => {

    const dispatch = useDispatch<ThunkDispatch<AppRootState, any, AnyAction> >()

    useEffect(() => {
        dispatch(getTasksFromServerTC(props.id))
    }, []);


    const getFilteredTasks = (tasks: TaskAPIType[], filter: TypeFilter) => {
        switch (filter) {
            case "active" :
                return tasks.filter((task:TaskAPIType) => task.status === TaskStatuses.New)
            case "completed":
                return tasks.filter((task: TaskAPIType) => task.status === TaskStatuses.Completed)
            default :
                return tasks
        }
    }

    const filteredTasks: Array<TaskAPIType> =  getFilteredTasks(props.tasks, props.filter)

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
                <DeleteIcon style={{margin: "0 5px", cursor: 'pointer'}} onClick={() => props.removeTodoList(props.id)}
                            fontSize={"small"}/>
                <AddItemTask addItem={addTask}/>
                <ul ref={listRef}>
                    {filteredTasks.map((task: TaskAPIType) =>
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
