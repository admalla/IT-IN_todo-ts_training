import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/Store";
import {
    addNewTaskAC,
    changeCheckBoxTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    TasksType
} from "../../state/reducers/task-reducer";
import {useCallback} from "react";
import {v1} from "uuid";
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC
} from "../../state/reducers/todoList-reducer";
import {TodoListsType, TypeFilter} from "../App";

export const useApp = () => {
    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    const addTodoList = useCallback((title: string) => {
        let newTodoListId = v1()
        dispatch(addTodoListAC(title, newTodoListId))
    }, [])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [])

    const changeFilterTodoList = useCallback((str: TypeFilter, todoListId: string) => {
        dispatch(changeFilterTodoListAC(todoListId, str))
    }, [])

    const changeTitleTodoLists = useCallback((title: string, todoListId: string) => {
        dispatch(changeTitleTodoListAC(todoListId, title))
    }, [])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(todoListId, id))
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        let taskId = v1()
        dispatch(addNewTaskAC(todoListId, taskId, title))
    }, [])

    const onCheckBox = useCallback((id: string, todoListId: string) => {
        dispatch(changeCheckBoxTaskAC(todoListId, id))
    }, [])

    const changeTitleTask = useCallback((title: string, taskId: string, todoListId: string) => {
        dispatch(changeTitleTaskAC(todoListId, taskId, title))
    }, [])

    return {
        tasks,
        todoLists,
        addTodoList,
        removeTask,
        changeFilterTodoList,
        addTask,
        onCheckBox,
        removeTodoList,
        changeTitleTodoLists,
        changeTitleTask
    }
}