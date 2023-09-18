import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/Store";
import {
    addTaskFromServerTC,
    changeCheckBoxTaskAC,
    removeTaskFromServerTC,
    TasksType, updateStatusTaskTC, updateTitleTaskFromServerTC
} from "../../state/reducers/task-reducer";
import {useCallback, useEffect} from "react";
import {
    addTodolistFromServerTC,
    changeFilterTodoListAC, changeTitleTLFromServerTC,
    getTodoListDomainTC, removeTodolistFromServerTC, TodoListWithFilterType, TypeFilter
} from "../../state/reducers/todoList-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const useApp = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootState, any, AnyAction>>()

    const todoLists = useSelector<AppRootState, Array<TodoListWithFilterType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    useEffect(() => {
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