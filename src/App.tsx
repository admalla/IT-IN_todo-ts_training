import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type TypeFilter = "all" | "active" | "completed" | "three"
type TodoListsType = {
    id: string
    title: string
    filter: TypeFilter
}

function App() {
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    //     { id: v1(), title: "ReactJS", isDone: false },
    //     { id: v1(), title: "HTML", isDone: true },
    //     { id: v1(), title: "CSS", isDone: false }
    // ])
    // const [filter, setFilter] = useState<TypeFilter>("all")
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

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: "React", filter: 'active'},
        {id: todoListId2, title: "JavaScript", filter: "completed"}
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

    return (
        <div className="App">
            {todoLists.map(tl => {

                const getFilteredTasks = (tasks: TaskType[], filter: TypeFilter) => {
                    switch (filter) {
                        case "active" :
                            return tasks.filter((task:TaskType) => task.isDone === false)
                        case "completed":
                            return tasks.filter((task: TaskType) => task.isDone === true)
                        case "three":
                            return tasks.filter((task: TaskType, index: number) => index < 3)
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
                />
            })}

        </div>
    );
}
export default App;