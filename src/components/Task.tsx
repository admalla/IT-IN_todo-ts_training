import React from "react";
import EditableTitle from "../EditableTitle/EditableTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskAPIType} from "../api/TaskAPI";

type TaskPropsType = {
    onCheckBox: (id: string, todoListId: string, isChecked: boolean) => void
    changeTitleTask: (title: string, taskId: string, todoLIstId: string) => void
    removeTask: (id: string, todoListId: string) => void
    todoListId: string
    task: TaskAPIType
}
export const Task = React.memo((props: TaskPropsType) => {
    const newTitleTask = (title: string) => {
        props.changeTitleTask(title, props.task.id, props.todoListId)
    }

    const onCheckBoxHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        console.log(props.task.status)
        props.onCheckBox(props.task.id, props.todoListId, e.currentTarget.checked)
    }
    return (
        <li key={props.task.id} className={props.task.status ? "is-done" : ""}>
            <input
                type="checkbox"
                checked={!!props.task.status}
                onChange={onCheckBoxHandler}
            />
            <EditableTitle title={props.task.title} callBack={newTitleTask}/>
            <DeleteIcon style={{margin: "0 5px", cursor: 'pointer'}}
                        onClick={() => props.removeTask(props.task.id, props.todoListId)}
                        fontSize={"small"}/>
        </li>
    )
})