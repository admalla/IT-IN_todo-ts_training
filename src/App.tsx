import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemTask from "./AddItemTask";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export type TypeFilter = "all" | "active" | "completed"
type TodoListsType = {
    id: string
    title: string
    filter: TypeFilter
}

function App() {
    const filterName = (str: TypeFilter, todoListId: string) => {
        let changeFilter = todoLists.find(tl => tl.id === todoListId)
        if(changeFilter) {
            changeFilter.filter = str
            setTodoLists([...todoLists])
        }
    }

    const  removeTask = (id: string, todoListId: string) => {
        let todoList = tasks[todoListId]
        let filteredTodoList = todoList.filter(tl => tl.id !== id)
        tasks[todoListId] = filteredTodoList
        setTasks({...tasks, [todoListId]: tasks[todoListId]})
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoLists)
        delete tasks[todoListId]
    }

    const removeAllTasks = (todoListId: string) => {
        setTasks({...tasks, [todoListId] : []})
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const onCheckBox = (id: string, todoListId: string) => {
        let todoList = tasks[todoListId]
        let checked = todoList.map(task => task.id === id ? {...task, isDone: !task.isDone} : task)
        setTasks({...tasks, [todoListId] :  checked})
    }

    const changeTitleTodoLists = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }

    const changeTitleTask = (title: string, taskId: string, todoListId: string) => {
        let todoList = tasks[todoListId]
        let changedTitle = todoList.map(task => task.id === taskId ? {...task, title} : task)
        setTasks({...tasks, [todoListId] :  changedTitle})
    }

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: "React", filter: 'all'},
        {id: todoListId2, title: "JavaScript", filter: "all"}
    ])

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: false }
        ],
        [todoListId2]: [
            { id: v1(), title: "Redux", isDone: true },
            { id: v1(), title: "JSX", isDone: true },
            { id: v1(), title: "Next", isDone: false },
        ]
    })

    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        setTodoLists([{id: newTodoListId, title, filter: 'all'}, ...todoLists])
        setTasks({ [newTodoListId]: [], ...tasks} )
    }

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
                            News
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
                    filterName={filterName}
                    removeAllTasks={removeAllTasks}
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