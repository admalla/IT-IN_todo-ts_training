import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useAppSelector} from "../../state/Store";
import {
    addTaskFromServerTC,
    removeTaskFromServerTC,
    TasksType, updateStatusTaskTC, updateTitleTaskFromServerTC
} from "../../state/reducers/task-reducer";
import React, {useCallback, useEffect} from "react";
import {
    addTodolistFromServerTC,
    changeFilterTodoListAC, changeTitleTLFromServerTC,
    getTodoListDomainTC, removeTodolistFromServerTC, TodoListWithFilterType, TypeFilter
} from "../../state/reducers/todoList-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import Grid from "@mui/material/Unstable_Grid2";
import AddItemTask from "../../AddItemTask/AddItemTask";
import {Paper} from "@mui/material";
import {TodoList} from "./TodoList";
import {Navigate} from "react-router-dom";

export type DemoType = {
    demo?: boolean
}

export const TodoListsList = ({demo}: DemoType) => {

    const dispatch = useDispatch<ThunkDispatch<AppRootState, any, AnyAction>>()

    const todoLists = useSelector<AppRootState, Array<TodoListWithFilterType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)
    const isLogin = useAppSelector(state => state.auth.isLogin)

    useEffect(() => {
        if (!isLogin) return;
        if (demo) return;
        dispatch(getTodoListDomainTC())
    }, []);


    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistFromServerTC(title))
    }, [])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistFromServerTC(todoListId))
    }, [])

    const changeFilterTodoList = useCallback((str: TypeFilter, todoListId: string) => {
        dispatch(changeFilterTodoListAC(todoListId, str))
    }, [])

    const changeTitleTodoLists = useCallback((title: string, todoListId: string) => {
        dispatch(changeTitleTLFromServerTC(title, todoListId))
    }, [])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskFromServerTC(todoListId, id))
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskFromServerTC(todoListId, title))
    }, [])

    const onCheckBox = useCallback((id: string, todoListId: string, isChecked: boolean) => {
        const status = isChecked ? 2 : 0
        dispatch(updateStatusTaskTC(todoListId, id, status))
    }, [])

    const changeTitleTask = useCallback((title: string, taskId: string, todoListId: string) => {
        dispatch(updateTitleTaskFromServerTC(todoListId, taskId, title))
    }, [])

    if (!isLogin) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            <Grid container style={{padding: "20px"}}>
                <AddItemTask addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(tl => {
                    return <Grid key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <TodoList
                                id={tl.id}
                                title={tl.title}
                                statusTodo={tl.statusTD}
                                tasks={tasks[tl.id]}
                                removeTask={removeTask}
                                filterName={changeFilterTodoList}
                                addTask={addTask}
                                onCheckBox={onCheckBox}
                                filter={tl.filter}
                                removeTodoList={removeTodoList}
                                changeTitleTodoLists={changeTitleTodoLists}
                                changeTitleTask={changeTitleTask}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </div>
    )
}
