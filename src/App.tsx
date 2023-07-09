import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type TypeFilter = "all" | "active" | "completed" | "three"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])
    const [filter, setFilter] = useState<TypeFilter>("all")
    const filterName = (str: TypeFilter) => {
        setFilter(str)
    }

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

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    const  removeTask = (id: string) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== id))
    }

    const removeAllTasks = () => {
        setTasks([])
    }

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const onCheckBox = (id: string) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone: !task.isDone} : task))
    }

    return (
        <div className="App">
            <TodoList
                title="learn JS"
                tasks={filteredTasks}
                removeTask={removeTask}
                filterName={filterName}
                removeAllTasks={removeAllTasks}
                addTask={addTask}
                onCheckBox={onCheckBox}
                filter={filter}
            />
        </div>
    );
}
export default App;