import React from "react";
import EditableTitle from "./EditableTitle/EditableTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    onCheckBox: (id: string, todoListId: string) => void
    changeTitleTask: (title: string, taskId: string, todoLIstId: string) => void
    removeTask: (id: string, todoListId: string) => void
    todoListId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const newTitleTask = (title: string) => {
        props.changeTitleTask(title, props.task.id, props.todoListId)
    }
    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <input
                type="checkbox"
                checked={props.task.isDone}
                onChange={() => props.onCheckBox(props.task.id, props.todoListId)}
            />
            <EditableTitle title={props.task.title} callBack={newTitleTask}/>
            <DeleteIcon style={{margin: "0 5px"}}
                        onClick={() => props.removeTask(props.task.id, props.todoListId)}
                        fontSize={"small"}/>
        </li>
    )
})