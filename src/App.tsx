import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemTask from "./AddItemTask";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/Store";
import {
    addNewTaskAC,
    changeCheckBoxTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    TasksType
} from "./state/reducers/task-reducer";
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC
} from "./state/reducers/todoList-reducer";

export type TypeFilter = "all" | "active" | "completed"
export type TodoListsType = {
    id: string
    title: string
    filter: TypeFilter
}

function App() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        // setTodoLists([{id: newTodoListId, title, filter: 'all'}, ...todoLists])
        // setTasks({ [newTodoListId]: [], ...tasks} )
        dispatch(addTodoListAC(title, newTodoListId))
    }

    const removeTodoList = (todoListId: string) => {
        // let filteredTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        // setTodoLists(filteredTodoLists)
        // delete tasks[todoListId]
        dispatch(removeTodoListAC(todoListId))
    }

    const changeFilterTodoList = (str: TypeFilter, todoListId: string) => {
        // let changeFilter = todoLists.find(tl => tl.id === todoListId)
        // if(changeFilter) {
        //     changeFilter.filter = str
        //     setTodoLists([...todoLists])
        // }
        dispatch(changeFilterTodoListAC(todoListId, str))
    }

    const changeTitleTodoLists = (title: string, todoListId: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
        dispatch(changeTitleTodoListAC(todoListId, title))
    }

    const  removeTask = (id: string, todoListId: string) => {
        // let todoList = tasks[todoListId]
        // let filteredTodoList = todoList.filter(tl => tl.id !== id)
        // tasks[todoListId] = filteredTodoList
        // setTasks({...tasks, [todoListId]: tasks[todoListId]})
        dispatch(removeTaskAC(todoListId, id))
    }



    // const removeAllTasks = (todoListId: string) => {
    //     setTasks({...tasks, [todoListId] : []})
    // }

    const addTask = (title: string, todoListId: string) => {
        let taskId = v1()
        // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        dispatch(addNewTaskAC(todoListId, taskId, title))
    }

    const onCheckBox = (id: string, todoListId: string) => {
        // let todoList = tasks[todoListId]
        // let checked = todoList.map(task => task.id === id ? {...task, isDone: !task.isDone} : task)
        // setTasks({...tasks, [todoListId] :  checked})
        dispatch(changeCheckBoxTaskAC(todoListId, id))
    }



    const changeTitleTask = (title: string, taskId: string, todoListId: string) => {
        // let todoList = tasks[todoListId]
        // let changedTitle = todoList.map(task => task.id === taskId ? {...task, title} : task)
        // setTasks({...tasks, [todoListId] :  changedTitle})
        dispatch(changeTitleTaskAC(todoListId, taskId, title))
    }

    // const todoListId1 = v1()
    // const todoListId2 = v1()
    //
    // const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    //     {id: todoListId1, title: "React", filter: 'all'},
    //     {id: todoListId2, title: "JavaScript", filter: "all"}
    // ])
    //
    // const [tasks, setTasks] = useState({
    //     [todoListId1]: [
    //         { id: v1(), title: "HTML&CSS", isDone: true },
    //         { id: v1(), title: "JS", isDone: true },
    //         { id: v1(), title: "ReactJS", isDone: false },
    //         { id: v1(), title: "HTML", isDone: true },
    //         { id: v1(), title: "CSS", isDone: false }
    //     ],
    //     [todoListId2]: [
    //         { id: v1(), title: "Redux", isDone: true },
    //         { id: v1(), title: "JSX", isDone: true },
    //         { id: v1(), title: "Next", isDone: false },
    //     ]
    // })



    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            TodoList
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        <div className="App">
            <AddItemTask addItem={addTodoList} />
            {todoLists.map(tl => {

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

                const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)

                return <TodoList
                    id={ tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    filterName={changeFilterTodoList}
                    addTask={addTask}
                    onCheckBox={onCheckBox}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTitleTodoLists={changeTitleTodoLists}
                    changeTitleTask={changeTitleTask}
                />
            })}

        </div>
        </>
    );
}
export default App;